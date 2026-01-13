import { z } from "zod";

export const serviceOptions = [
  "Mowing Services",
  "Mulching",
  "Hedge & Bush Trimming",
  "Fertilizer & Spray Treatments",
  "Aeration",
  "Seasonal Cleanup"
] as const;

export const yardSizes = ["small", "medium", "large"] as const;
export const contactPreferences = ["call", "text", "email"] as const;

export const leadSchema = z.object({
  fullName: z.string().min(2, "Please enter your name."),
  phone: z.string().min(7, "Please provide a phone number."),
  email: z.string().email("Please provide a valid email.").optional().or(z.literal("")),
  address: z.string().min(5, "Please provide the service address."),
  serviceType: z
    .array(z.enum(serviceOptions))
    .min(1, "Select at least one service."),
  yardSize: z.enum(yardSizes),
  preferredContact: z.enum(contactPreferences),
  notes: z.string().max(1000).optional().or(z.literal(""))
});

export type LeadPayload = z.infer<typeof leadSchema>;
