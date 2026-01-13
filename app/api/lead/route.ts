import { NextResponse } from "next/server";

import { leadSchema } from "@/lib/leadSchema";
import { sendLeadToSAP } from "@/lib/sap";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lead = leadSchema.parse(body);

    const result = await sendLeadToSAP(lead);

    return NextResponse.json({ success: true, leadId: result.leadId });
  } catch (error) {
    console.error("[Lead]", error);
    return NextResponse.json(
      { success: false, message: "Unable to process lead." },
      { status: 400 }
    );
  }
}
