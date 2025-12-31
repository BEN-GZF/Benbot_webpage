import { profile } from "./profile";
import { projects } from "./projects";

export function buildKnowledgeBase() {
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

  // Optional links
  if (profile.meshDemo) lines.push(`3D Mesh Demo: ${profile.meshDemo}`);
  if ((profile as any).meshGithub) lines.push(`3D Mesh GitHub: ${(profile as any).meshGithub}`);
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
