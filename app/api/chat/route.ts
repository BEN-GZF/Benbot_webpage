import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

function buildKnowledgeBase() {
  const lines: string[] = [];
  // General
  lines.push(`Name: ${profile.name}`);
  lines.push(`School: ${profile.school}`);
  lines.push(`Major: ${profile.major}`);
  lines.push(`Minor: ${profile.minor}`);
  lines.push(`Graduation Year: ${profile.gradYear}`);
  lines.push(`Email: ${profile.email}`);
  lines.push(`GitHub: ${profile.github}`);
  lines.push(`Resume: ${profile.resume}`);

  // 3D Mesh
  if (profile.meshDemo) lines.push(`3D Mesh Demo: ${profile.meshDemo}`);
  if ((profile as any).meshGithub) lines.push(`3D Mesh GitHub: ${(profile as any).meshGithub}`);

  // XAI-AV
  if ((profile as any).xaiDemo) lines.push(`XAI-AV Demo: ${(profile as any).xaiDemo}`);

  lines.push("");
  lines.push("Projects:");
  for (const p of projects as any[]) {
    lines.push(`- ${p.title}${p.timeframe ? ` (${p.timeframe})` : ""}`);
    if (p.oneLiner) lines.push(`  Summary: ${p.oneLiner}`);
    if (p.details?.length) for (const d of p.details) lines.push(`  - ${d}`);
    if (p.links?.length) {
      lines.push(`  Links: ${p.links.map((l: any) => `${l.label}: ${l.href}`).join(" | ")}`);
    }
  }
  return lines.join("\n");
}


export async function POST(req: Request) {
  try {
    console.log("ENV loaded:", !!process.env.DEEPSEEK_API_KEY);

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { answer: "Server misconfigured: DEEPSEEK_API_KEY is missing in .env.local" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const messages = body.messages ?? [];
    const lastUser =
      [...messages].reverse().find((m: any) => m.role === "user")?.content ?? "";

    const kb = buildKnowledgeBase();

    const systemPrompt = `
    You are BenBot, the personal website assistant for Zhefan (Ben) Guo.

    Hard rules:
    - Use ONLY facts that appear in the Knowledge Base.
    - If the Knowledge Base does not contain the answer, say you don't have that information.
    - Do NOT invent names, labs, achievements, dates, or links.
    - If not in KB: say you don't have that information, and optionally suggest checking the resume.
    - Do NOT use Markdown links. If sharing a link, output the raw URL only.


    Style:
    - Sound friendly and human, not like a template.
    - Vary phrasing (avoid repeating the same sentence patterns).
    - Prefer short paragraphs and bullet points when helpful.
    - You may add light conversational phrases (e.g., "Sure,", "Here's what I have:",) as long as you do NOT add new facts.
    - Make sure you act like a vivid chatAgent
    - You can also include some Emojis, but not too often.
    - If the user asks "who are you" or "who is Ben", give a 2-4 sentence intro, then offer what they can ask next.

    Language: English.
    `.trim();


    const styleExamples = `
    Examples (style only):
    User: what's my email?
    Assistant: Sure — Ben’s email is zhefan.guo@uconn.edu.

    User: tell me who you are
    Assistant: I’m BenBot — a small assistant on Ben’s website. I can help with Ben’s background, projects, and links (based only on what’s listed on the site).

    User: tell me who is Ben
    Assistant: Ben (Zhefan Guo) is a Computer Science major with a Mathematics minor at UConn, graduating in 2026. Want his projects or links?
    `.trim();


    const userPrompt = `
Knowledge Base:
${kb}

User question:
${lastUser}
`.trim();

    const res = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.5,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "system", content: styleExamples },
            { role: "system", content: `Knowledge Base:\n${kb}` },
            { role: "user", content: lastUser },
        ],
      }),
    });

    const data = await res.json();

    // Debug: if DeepSeek returns an error, show it
    if (!res.ok) {
    const msg =
        data?.error?.message ||
        data?.message ||
        JSON.stringify(data);

    if (String(msg).toLowerCase().includes("insufficient balance")) {
        return NextResponse.json({
        answer:
            "BenBot is temporarily unavailable (API balance is not set up yet). Please check back later or use the contact email: zhefan.guo@uconn.edu.",
        });
    }

    return NextResponse.json(
        { answer: `DeepSeek API error: ${msg}` },
        { status: 500 }
    );
    }


    const answer = data?.choices?.[0]?.message?.content ?? "Sorry — no response.";
    return NextResponse.json({ answer });
  } catch (e: any) {
    return NextResponse.json(
      { answer: `Server error: ${e?.message ?? "unknown error"}` },
      { status: 500 }
    );
  }
}
