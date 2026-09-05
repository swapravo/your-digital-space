import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const WEBHOOK_URL = "https://rick4044.app.n8n.cloud/webhook/hr-bot";

const questionSchema = z.object({
  question: z.string().trim().min(1, "Question is required").max(1000),
});

export const askHrBot = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => questionSchema.parse(data))
  .handler(async ({ data }) => {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: data.question }),
    });

    if (!res.ok) {
      return {
        ok: false as const,
        error: "HR Bot is unavailable. Please try again later.",
      };
    }

    const json = (await res.json()) as Record<string, unknown>;
    const answer =
      String(json.output ?? json.answer ?? json.message ?? "").trim() ||
      "No answer returned.";

    return { ok: true as const, answer };
  });
