"use client";

import { useMemo, useState } from "react";

type TabKey = "about" | "projects" | "resume" | "contact";

type Panel = {
  key: TabKey;
  label: string;
  command: string; // shown after "> "
  content: React.ReactNode;
};

export default function TerminalPanel({
  avatarUrl,
  name,
  subtitle,
  email,
  github,
  meshDemo,
  meshGithub,
  resumeUrl,
  projects,
}: {
  avatarUrl: string;
  name: string;
  subtitle: string;
  email: string;
  github: string;
  meshDemo: string;
  resumeUrl: string;
  meshGithub: string;
  projects: { title: string; oneLiner: string; links: { label: string; href: string }[] }[];
}) {
  const panels: Panel[] = useMemo(
    () => [
      {
        key: "about",
        label: "About",
        command: "open about",
        content: (
        <div className="space-y-3">
            <p>
            I’m {name}. I’m engineering-driven—I like building end-to-end AI systems that turn model
            outputs into something usable, like a clean web demo or a working pipeline.
            </p>

            <p className="text-zinc-300">
            Current focus: explainable AI, multimodal systems, and practical integration work (data, backend, frontend).
            </p>

            {/* Interest tags */}
            <div className="pt-1">
            <div className="text-zinc-400">Interests</div>
            <div className="mt-2 flex flex-wrap gap-2">
                {[
                "Explainable AI (XAI)",
                "Multimodal Learning",
                "Computer Vision",
                "ML Engineering",
                "System Integration",
                "World Models (Exploration)",
                ].map((tag) => (
                <span
                    key={tag}
                    className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-200"
                >
                    {tag}
                </span>
                ))}
            </div>

            <div className="mt-4 text-zinc-400">Goals</div>
            <div className="mt-2 flex flex-wrap gap-2">
                {[
                "Build trustworthy real-world AI systems",
                "Graduate study (AI/ML) → industry-oriented work",
                ].map((tag) => (
                <span
                    key={tag}
                    className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-200"
                >
                    {tag}
                </span>
                ))}
            </div>
            </div>
        </div>
        ),

      },
      {
        key: "projects",
        label: "Projects",
        command: "open projects",
        content: (
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.title} className="space-y-1">
                <div className="font-semibold text-zinc-100">{p.title}</div>
                <div className="text-zinc-300">{p.oneLiner}</div>
                <div className="flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      className="text-zinc-200 underline underline-offset-4 hover:text-white"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        key: "resume",
        label: "Resume",
        command: "open resume",
        content: (
          <div className="space-y-2">
            <p className="text-zinc-300">Download my resume (PDF):</p>
            <a
              href={resumeUrl}
              target="_blank"
              className="text-zinc-200 underline underline-offset-4 hover:text-white"
            >
              {resumeUrl}
            </a>
          </div>
        ),
      },
      {
        key: "contact",
        label: "Contact",
        command: "open contact",
        content: (
          <div className="space-y-2">
            <div>
              <span className="text-zinc-400">Email:  </span>
              <a
                href={`mailto:${email}`}
                className="text-zinc-200 underline underline-offset-4 hover:text-white"
              >
                {email}
              </a>
            </div>
            <div>
              <span className="text-zinc-400">GitHub: </span>
              <a
                href={github}
                target="_blank"
                className="text-zinc-200 underline underline-offset-4 hover:text-white"
              >
                {github}
              </a>
            </div>
            
          </div>
        ),
      },
    ],
    [email, github, meshDemo, name, projects, resumeUrl]
  );

  const [active, setActive] = useState<TabKey>("about");
  const current = panels.find((p) => p.key === active)!;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <img
            src={avatarUrl}
            alt="Portrait"
            className="h-24 w-24 rounded-2xl object-cover shadow-sm"
          />
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">{name}</h1>
          <p className="mt-2 text-sm text-zinc-600">{subtitle}</p>

          {/* Nav */}
          <div className="mt-6 flex flex-wrap justify-center gap-5 text-sm text-zinc-700">
            {panels.map((p) => (
              <button
                key={p.key}
                onClick={() => setActive(p.key)}
                className={
                  "hover:text-zinc-900 " +
                  (active === p.key ? "font-semibold underline underline-offset-4" : "")
                }
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal */}
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-zinc-950 p-5 shadow-lg">
          <div className="font-mono text-sm leading-6">
            <div className="text-zinc-400">{`> ${current.command}`}</div>
            <div className="mt-3 text-zinc-200">{current.content}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
