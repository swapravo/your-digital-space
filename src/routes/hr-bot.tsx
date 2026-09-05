import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";

import { askHrBot } from "@/lib/hr-bot.functions";
import { ArrowLeft, Send, Sparkles, User } from "lucide-react";

export const Route = createFileRoute("/hr-bot")({
  head: () => ({
    meta: [
      { title: "HR Bot — Ask About Company Policies" },
      {
        name: "description",
        content:
          "Ask the HR Bot anything about company policies and get instant, document-grounded answers.",
      },
      { property: "og:title", content: "HR Bot — Ask About Company Policies" },
      {
        property: "og:description",
        content:
          "Get quick answers to your HR and policy questions from the company knowledge base.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HrBotPage,
});

const shell = "mx-auto w-full max-w-[1280px] px-5 md:px-8";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
};

function HrBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text:
        "Hi! I'm the HR Bot. Ask me anything about company policies — leave, benefits, remote work, and more.",
    },
  ]);
  const [question, setQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const submitQuestion = useServerFn(askHrBot);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || submitting) return;

    setError(null);
    setSubmitting(true);
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      const res = await submitQuestion({ data: { question: trimmed } });
      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "bot", text: res.answer },
        ]);
      } else {
        setError(res.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink">
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/95 backdrop-blur">
        <div className={`${shell} flex h-16 items-center gap-4`}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-green"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Good Bar.
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="bg-lime py-12 text-green-deep md:py-16">
          <div className={shell}>
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase">
                HR Bot
              </span>
            </div>
            <h1 className="display mt-4 text-[clamp(2.5rem,7vw,5rem)]">
              Ask a policy question.
            </h1>
            <p className="mt-4 max-w-xl text-lg font-medium">
              Get instant answers grounded in the official company policies document.
            </p>
          </div>
        </section>

        <section className={`${shell} flex flex-1 flex-col py-8 md:py-12`}>
          <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border-2 border-ink bg-white shadow-sm">
            <div className="flex-1 space-y-5 overflow-y-auto p-5 md:p-8">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${
                    m.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink ${
                      m.role === "user" ? "bg-green text-cream" : "bg-lime text-ink"
                    }`}
                  >
                    {m.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl border-2 border-ink px-5 py-3 text-base leading-relaxed ${
                      m.role === "user"
                        ? "bg-ink text-cream"
                        : "bg-cream text-ink"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              ))}
              {submitting && (
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-lime text-ink">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl border-2 border-ink bg-cream px-5 py-3 text-ink">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-ink" />
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-ink"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-ink"
                        style={{ animationDelay: "300ms" }}
                      />
                    </span>
                  </div>
                </div>
              )}
              {error && (
                <p className="rounded-2xl border-2 border-pink bg-pink/10 px-5 py-3 text-sm font-semibold text-ink">
                  {error}
                </p>
              )}
              <div ref={scrollRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t-2 border-ink bg-cream p-4 md:p-6"
            >
              <div className="flex gap-3">
                <input
                  required
                  maxLength={1000}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. How many leaves can I take in a year?"
                  className="flex-1 rounded-full border-2 border-ink bg-white px-5 py-3 text-base outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={submitting || !question.trim()}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold tracking-widest text-cream transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  <span className="hidden sm:inline">ASK</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
