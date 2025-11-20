import { useTranslations } from "next-intl";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiDocker,
  SiAmazon,
  SiPostgresql,
} from "react-icons/si";

export function TrustedBy() {
  const t = useTranslations("TrustedBy");

  const stack = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "React", icon: SiReact },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Docker", icon: SiDocker },
    { name: "AWS", icon: SiAmazon },
    { name: "PostgreSQL", icon: SiPostgresql },
  ];

  return (
    <section className="container py-12 border-b border-border/40 max-w-5xl mx-auto">
      <p className="text-sm text-muted-foreground font-medium mb-8 text-center uppercase tracking-wider">
        {t("title")}
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-50 hover:opacity-100 transition-opacity duration-500">
        {stack.map((tech) => (
          <div
            key={tech.name}
            className="text-4xl text-foreground/80 hover:text-foreground transition-colors duration-300"
            title={tech.name}>
            <tech.icon />
          </div>
        ))}
      </div>
    </section>
  );
}
