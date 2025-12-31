export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
