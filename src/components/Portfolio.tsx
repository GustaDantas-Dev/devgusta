import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code, Briefcase, FolderKanban } from "lucide-react";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { Projects } from "./Projects";

type Section = "skills" | "experience" | "projects";

export const Portfolio = () => {
  const [activeSection, setActiveSection] = useState<Section | null>(null);

  const sections = [
    { id: "skills" as Section, label: "habilidades", icon: Code, cmd: "ls skills/" },
    { id: "experience" as Section, label: "experiências", icon: Briefcase, cmd: "cat experience.log" },
    { id: "projects" as Section, label: "projetos", icon: FolderKanban, cmd: "ls projects/" },
  ];

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="font-mono text-sm text-muted-foreground mb-3">
            <span className="text-primary">$</span> cd ~/portfolio
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-card-foreground">
            Meu <span className="text-primary text-glow">Portfólio</span>
          </h2>
          <p className="font-mono text-sm text-muted-foreground max-w-lg mx-auto">
            // Explore habilidades, experiências e projetos
          </p>
        </motion.div>

        {/* Section Toggles - Terminal style */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              className={`gap-2 font-mono text-sm ${
                activeSection === section.id
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
                  : "border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5"
              }`}
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
            >
              <span className="text-xs opacity-60">$</span>
              {section.cmd}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {activeSection === "skills" && <Skills />}
          {activeSection === "experience" && <Experience />}
          {activeSection === "projects" && <Projects />}

          {!activeSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 font-mono"
            >
              <div className="text-muted-foreground text-sm space-y-2">
                <p><span className="text-primary">$</span> Selecione um comando acima para explorar</p>
                <p className="text-xs opacity-50">awaiting input...</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
