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
    <div className="w-full bg-muted border-b border-primary/20 text-card-foreground py-1.5 px-3 fixed top-0 left-0 right-0 z-[60]">
      <div className="container mx-auto flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono">
        <span className="flex items-center gap-1.5 font-semibold whitespace-nowrap">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          Disponível para oportunidades
        </span>

        <span className="text-muted-foreground/50">|</span>

        <div className="flex items-center gap-2 sm:gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open(link.href, "_blank", "noopener,noreferrer");
              }}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
              aria-label={link.label}
            >
              <link.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden md:inline">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
