import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Warehouse, Volume2, Globe, Bot, ClipboardList, FileText, ExternalLink } from "lucide-react";

const projects = [
  {
    icon: Warehouse,
    title: "Armazém Inteligente",
    description: "IoT + Fullstack com ESP32, sensores de peso (HX711), RFID (RC522) e alertas automáticos via Telegram.",
    tech: ["ESP32", "Arduino", "RFID", "Telegram Bot", "IoT"],
    link: "https://wa.me/5592993232190?text=Olá! Tenho interesse no projeto Armazém Inteligente.",
  },
  {
    icon: Volume2,
    title: "Competição de Gritos",
    description: "ESP32 + Web Interface para medir volume do público por microfone. Dashboard em tempo real.",
    tech: ["ESP32", "JavaScript", "Web Interface", "Sensores"],
    link: "https://wa.me/5592993232190?text=Olá! Tenho interesse no projeto Competição de Gritos.",
  },
  {
    icon: Globe,
    title: "Sites Profissionais",
    description: "TH Rastreamento, LETRAN, barbearia. Portfólios para filmmaker, advogado e arquiteto.",
    tech: ["HTML/CSS", "JavaScript", "Responsive", "WhatsApp API"],
    link: "/exemplos/th-rastreadores.html",
  },
  {
    icon: Bot,
    title: "Cardápios + Chatbot",
    description: "Cardápios digitais com chatbot para registrar pedidos automaticamente.",
    tech: ["Chatbot", "JavaScript", "Automation"],
    link: "https://wa.me/5592993232190?text=Olá! Tenho interesse no projeto Cardápios Digitais.",
  },
  {
    icon: ClipboardList,
    title: "Sistema Prisional",
    description: "Organização Kanban com módulos: cadastro, visitas, disciplina, movimentação e relatórios.",
    tech: ["Análise", "Documentação", "DER/MER", "BPMN"],
    link: "https://wa.me/5592993232190?text=Olá! Tenho interesse no projeto Sistema Prisional.",
  },
  {
    icon: FileText,
    title: "Documentações Técnicas",
    description: "DERs, MERs, diagramas de casos de uso, fluxos BPMN e documentos padronizados ABNT.",
    tech: ["Documentação", "DER/MER", "BPMN", "ABNT"],
    link: "https://wa.me/5592993232190?text=Olá! Gostaria de ver suas documentações técnicas.",
  },
];

export const Projects = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="terminal-border rounded-lg bg-card/50 backdrop-blur overflow-hidden group hover:shadow-glow transition-all duration-300 flex flex-col"
        >
          {/* Terminal bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/10 bg-primary/5">
            <span className="w-3 h-3 rounded-full bg-destructive/60" />
            <span className="w-3 h-3 rounded-full bg-accent/60" />
            <span className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="font-mono text-xs text-muted-foreground ml-2 truncate">
              {project.title.toLowerCase().replace(/\s+/g, "_")}.ts
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded border border-primary/30 bg-primary/5 flex items-center justify-center">
                <project.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-card-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
            </div>

            <p className="font-mono text-xs text-muted-foreground mb-4 flex-1 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="font-mono text-[10px] py-0.5 px-2 border-secondary/30 bg-secondary/5 text-secondary"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-primary/30 text-primary hover:bg-primary/10 font-mono text-xs gap-2"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3" />
                Saiba Mais
              </a>
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
