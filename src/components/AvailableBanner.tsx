import { Mail, Github, Linkedin, MessageCircle } from "lucide-react";

const links = [
  {
    icon: MessageCircle,
    href: "https://wa.me/5592993232190",
    label: "WhatsApp",
  },
  {
    icon: Mail,
    href: "mailto:gustavo.fmm98@gmail.com",
    label: "Email",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/gustavo-dantas-7b8b6a203",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/GustaDantas-Dev",
    label: "GitHub",
  },
];

export const AvailableBanner = () => {
  return (
    <div className="w-full bg-primary text-primary-foreground py-2 px-4 relative z-[60]">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-4 text-sm font-mono">
        <span className="flex items-center gap-2 font-semibold">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
          </span>
          Disponível para oportunidades
        </span>

        <span className="hidden sm:inline text-primary-foreground/50">|</span>

        <div className="flex items-center gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              aria-label={link.label}
            >
              <link.icon className="w-4 h-4" />
              <span className="hidden md:inline">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
