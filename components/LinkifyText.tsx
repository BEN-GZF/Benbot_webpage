"use client";

const RESUME_URL = "https://ben-gzf.github.io/Benbot_webpage/resume.pdf";

export function LinkifyText({
  text,
  linkifyResumeWord = false,
}: {
  text: string;
  linkifyResumeWord?: boolean;
}) {
  const urlRegex = /(https?:\/\/[^\s]+|\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  function cleanLink(s: string) {
    s = s.trim();
    s = s.replace(/^[*_("'`\[]+/, "");
    s = s.replace(/[*_)"'`\],.!?:;]+$/, "");
    return s;
  }

  function linkifyResumeWords(s: string) {
    if (!linkifyResumeWord) return <span>{s}</span>;

    const wordRegex = /\bresume\b/gi;
    const chunks = s.split(wordRegex);
    if (chunks.length === 1) return <span>{s}</span>;

    return (
      <>
        {chunks.map((c, idx) => (
          <span key={idx}>
            {c}
            {idx < chunks.length - 1 && (
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-400 hover:text-blue-300"
              >
                resume
              </a>
            )}
          </span>
        ))}
      </>
    );
  }

  function toHref(cleaned: string) {
    if (cleaned === "/resume.pdf" || cleaned.endsWith("/resume.pdf")) {
      return RESUME_URL;
    }
    if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
      return cleaned;
    }
    return new URL(cleaned, window.location.origin).toString();
  }

  return (
    <span>
      {parts.map((part, i) => {
        if (!part) return null;

        const cleaned = cleanLink(part);
        const isLink =
          cleaned.startsWith("http://") ||
          cleaned.startsWith("https://") ||
          cleaned.startsWith("/");

        if (!isLink) return <span key={i}>{linkifyResumeWords(part)}</span>;

        const href = toHref(cleaned);

        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400 hover:text-blue-300"
          >
            {cleaned}
          </a>
        );
      })}
    </span>
  );
}
