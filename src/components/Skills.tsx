import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const hardSkills = [
  { name: "HTML/CSS", level: "expert" },
  { name: "JavaScript", level: "expert" },
  { name: "TypeScript", level: "advanced" },
  { name: "Python", level: "advanced" },
  { name: "Java", level: "intermediate" },
  { name: "C/C++", level: "intermediate" },
  { name: "React", level: "advanced" },
  { name: "Node.js", level: "advanced" },
  { name: "SQL", level: "advanced" },
  { name: "Arduino", level: "expert" },
  { name: "ESP32", level: "expert" },
  { name: "RFID", level: "advanced" },
  { name: "IoT", level: "expert" },
  { name: "APIs", level: "advanced" },
  { name: "Telegram Bot", level: "advanced" },
  { name: "Power BI", level: "intermediate" },
  { name: "Git/GitHub", level: "advanced" },
  { name: "Scrum", level: "intermediate" },
];

const softSkills = [
  "Comunicação Clara",
  "Documentação",
  "Proatividade",
  "Resolução de Problemas",
  "Trabalho em Equipe",
  "Autonomia",
  "Aprendizado Contínuo",
];

const levelColor: Record<string, string> = {
  expert: "border-primary/50 bg-primary/10 text-primary",
  advanced: "border-secondary/50 bg-secondary/10 text-secondary",
  intermediate: "border-accent/50 bg-accent/10 text-accent",
};

const levelLabel: Record<string, string> = {
  expert: "███",
  advanced: "██░",
  intermediate: "█░░",
};

export const Skills = () => {
  return (
    <div className="space-y-8">
      {/* Hard Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="terminal-border rounded-lg bg-card/50 backdrop-blur overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/10 bg-primary/5">
          <span className="w-3 h-3 rounded-full bg-destructive/60" />
          <span className="w-3 h-3 rounded-full bg-accent/60" />
          <span className="w-3 h-3 rounded-full bg-primary/60" />
          <span className="font-mono text-xs text-muted-foreground ml-2">hard_skills.json</span>
        </div>
        <div className="p-6">
          <div className="font-mono text-xs text-muted-foreground mb-4">
            <span className="text-primary">$</span> cat skills --type=hard
          </div>
          <div className="flex flex-wrap gap-2">
            {hardSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <Badge
                  variant="outline"
                  className={`font-mono text-xs py-1.5 px-3 ${levelColor[skill.level]} cursor-default transition-all hover:shadow-glow`}
                >
                  <span className="mr-2 opacity-50">{levelLabel[skill.level]}</span>
                  {skill.name}
                </Badge>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-6 mt-4 font-mono text-xs text-muted-foreground">
            <span><span className="text-primary">███</span> Expert</span>
            <span><span className="text-secondary">██░</span> Avançado</span>
            <span><span className="text-accent">█░░</span> Intermediário</span>
          </div>
        </div>
      </motion.div>

      {/* Soft Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="terminal-border rounded-lg bg-card/50 backdrop-blur overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/10 bg-primary/5">
          <span className="w-3 h-3 rounded-full bg-destructive/60" />
          <span className="w-3 h-3 rounded-full bg-accent/60" />
          <span className="w-3 h-3 rounded-full bg-primary/60" />
          <span className="font-mono text-xs text-muted-foreground ml-2">soft_skills.md</span>
        </div>
        <div className="p-6">
          <div className="font-mono text-xs text-muted-foreground mb-4">
            <span className="text-primary">$</span> cat skills --type=soft
          </div>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Badge
                  variant="outline"
                  className="font-mono text-xs py-1.5 px-3 border-muted-foreground/30 bg-muted/30 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all cursor-default"
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
