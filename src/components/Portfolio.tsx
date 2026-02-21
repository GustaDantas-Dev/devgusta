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
    { id: "skills" as Section, label: "Habilidades", icon: Code },
    { id: "experience" as Section, label: "Experiências", icon: Briefcase },
    { id: "projects" as Section, label: "Projetos", icon: FolderKanban },
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
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-card-foreground">
            Meu <span className="text-primary text-glow">Portfólio</span>
          </h2>
          <p className="font-mono text-sm text-muted-foreground max-w-lg mx-auto">
            Explore minhas habilidades, experiências e projetos
          </p>
        </motion.div>

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
              <section.icon className="w-4 h-4" />
              {section.label}
            </Button>
          ))}
        </div>

        <div className="min-h-[400px]">
          {activeSection === "skills" && <Skills />}
          {activeSection === "experience" && <Experience />}
          {activeSection === "projects" && <Projects />}

          {!activeSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-sm font-mono">
                Selecione uma opção acima para explorar
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
