type Props = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function SectionFrame({ id, code, title, subtitle, children }: Props) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <div className="panel overflow-hidden">
        <div className="panel-header">
          <span>
            {code} · {title}
          </span>
          <span className="text-amber-signal/80">● LIVE</span>
        </div>
        <div className="border-b border-crt-border px-5 py-4">
          <h2 className="font-display text-2xl font-bold tracking-[0.12em] text-phosphor md:text-3xl">
            {title}
          </h2>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-phosphor-dim">
            {subtitle}
          </p>
        </div>
        <div className="p-5 md:p-6">{children}</div>
      </div>
    </section>
  );
}
