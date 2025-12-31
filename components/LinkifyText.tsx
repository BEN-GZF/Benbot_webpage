"use client";

export function LinkifyText({ text }: { text: string }) {
  const regex = /(https?:\/\/[^\s]+|\/[^\s]+)/g;
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => {
        if (!part) return null;

        const isLink =
          part.startsWith("http://") ||
          part.startsWith("https://") ||
          part.startsWith("/");

        if (!isLink) return <span key={i}>{part}</span>;

        const href = part.startsWith("/")
          ? new URL(part, window.location.origin).toString()
          : part;

        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400 hover:text-blue-300"
          >
            {part}
          </a>
        );
      })}
    </span>
  );
}
