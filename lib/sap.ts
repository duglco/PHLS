import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";
import { randomUUID } from "crypto";

import type { LeadPayload } from "@/lib/leadSchema";

const DEFAULT_TIMEOUT_MS = 8000;
const MAX_RETRIES = 2;

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = DEFAULT_TIMEOUT_MS
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(id);
  }
}

async function retry<T>(fn: () => Promise<T>) {
  let lastError: unknown;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function sendLeadToSapEndpoint(lead: LeadPayload, leadId: string) {
  const apiUrl = process.env.SAP_API_URL;
  const apiKey = process.env.SAP_API_KEY;

  if (!apiUrl || !apiKey) {
    return { delivered: false };
  }

  const payload = {
    leadId,
    receivedAt: new Date().toISOString(),
    ...lead
  };

  await retry(async () => {
    const response = await fetchWithTimeout(`${apiUrl.replace(/\/$/, "")}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`SAP error: ${response.status}`);
    }
  });

  return { delivered: true, channel: "sap" } as const;
}

async function sendLeadEmail(lead: LeadPayload, leadId: string) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const salesEmail = process.env.SALES_EMAIL;

  if (!host || !user || !pass || !salesEmail) {
    return { delivered: false };
  }

  const transporter = nodemailer.createTransport({
    host,
    auth: { user, pass }
  });

  const messageLines = [
    `Lead ID: ${leadId}`,
    `Name: ${lead.fullName}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email || "N/A"}`,
    `Address: ${lead.address}`,
    `Services: ${lead.serviceType.join(", ")}`,
    `Yard Size: ${lead.yardSize}`,
    `Preferred Contact: ${lead.preferredContact}`,
    `Notes: ${lead.notes || "None"}`
  ];

  await transporter.sendMail({
    from: `Pine Hills Lawn <${user}>`,
    to: salesEmail,
    subject: `New lawn care lead (${lead.fullName})`,
    text: messageLines.join("\n")
  });

  return { delivered: true, channel: "email" } as const;
}

async function saveLeadLocal(lead: LeadPayload, leadId: string) {
  if (process.env.NODE_ENV !== "development") {
    return { delivered: false };
  }

  const storageDir = path.join(process.cwd(), ".data");
  const filePath = path.join(storageDir, "leads.json");
  const record = {
    leadId,
    receivedAt: new Date().toISOString(),
    ...lead
  };

  await fs.mkdir(storageDir, { recursive: true });

  let existing: unknown[] = [];
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    existing = JSON.parse(raw) as unknown[];
  } catch (error) {
    existing = [];
  }

  existing.push(record);
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2));

  console.warn("[Lead] Stored locally at .data/leads.json");

  return { delivered: true, channel: "local" } as const;
}

export async function sendLeadToSAP(lead: LeadPayload) {
  const leadId = randomUUID();

  const sapResult = await sendLeadToSapEndpoint(lead, leadId);
  if (sapResult.delivered) {
    return { leadId, channel: sapResult.channel };
  }

  const emailResult = await sendLeadEmail(lead, leadId);
  if (emailResult.delivered) {
    return { leadId, channel: emailResult.channel };
  }

  const localResult = await saveLeadLocal(lead, leadId);
  if (localResult.delivered) {
    return { leadId, channel: localResult.channel };
  }

  console.warn("[Lead] Lead not delivered: missing SAP + SMTP env vars.");
  return { leadId, channel: "unconfigured" } as const;
}
