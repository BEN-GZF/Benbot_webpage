import TerminalPanel from "@/components/TerminalPanel";
import ChatWidget from "@/components/ChatWidget";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function Page() {
  return (
    <>
      <TerminalPanel
        avatarUrl="avatar.jpg"   
        name={profile.name}
        subtitle={`${profile.major} @ ${profile.school} · Minor in ${profile.minor}`}
        email={profile.email}
        github={profile.github}
        meshDemo={profile.meshDemo}
        resumeUrl="resume.pdf"
        projects={projects}
        meshGithub={profile.meshGithub}
      />

      <ChatWidget />
    </>
  );
}
