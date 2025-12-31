"use client";

import { useEffect, useRef, useState } from "react";
import { LinkifyText } from "./LinkifyText";
import { buildKnowledgeBase } from "@/data/knowledgeBase";


//const API_URL = "https://benbot-backend.onrender.com/chat";
//const API_URL = "http://localhost:8000/chat";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://benbot-backend.onrender.com/chat"
    : "http://localhost:8000/chat";



type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm BenBot. Ask me anything about Ben (background, projects, links, contact).",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
        const kb = buildKnowledgeBase();

      //const res = await fetch("/api/chat", {
        const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, kb }),
      });

      const data = await res.json();
      const answer = data?.answer ?? "Sorry — no response.";

      setMessages([...next, { role: "assistant", content: answer }]);
    } catch (e: any) {
      setMessages([
        ...next,
        { role: "assistant", content: `Error: ${e?.message ?? "unknown"}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-zinc-900 text-zinc-100 shadow-lg hover:bg-zinc-800"
        aria-label="Open BenBot"
        title="BenBot"
      >
        B
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-90 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
            <div className="text-sm font-semibold text-zinc-100">BenBot</div>
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-zinc-400 hover:text-zinc-200"
            >
              close
            </button>
          </div>

          <div className="h-80 overflow-y-auto px-4 py-3 font-mono text-sm">
            {messages.map((m, i) => (
              <div key={i} className="mb-3">
                <div className="text-zinc-500">
                  {m.role === "user" ? "> you" : "> benbot"}
                </div>
                <div className="whitespace-pre-wrap text-zinc-200"><LinkifyText text = {m.content}/> </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="flex gap-2 border-t border-zinc-800 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Ask about Ben..."
              className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
            />
            <button
              onClick={send}
              disabled={loading}
              className="rounded-xl bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-white disabled:opacity-60"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
