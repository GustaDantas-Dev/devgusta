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

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              className={`relative flex flex-col items-center gap-2 px-6 py-4 rounded-xl font-mono text-sm cursor-pointer transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-primary text-primary-foreground shadow-glow ring-2 ring-primary/50"
                  : "bg-card border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-md hover:shadow-primary/10"
              }`}
            >
              <section.icon className={`w-6 h-6 ${activeSection === section.id ? "text-primary-foreground" : "text-primary"}`} />
              <span className="font-semibold">{section.label}</span>
              <span className={`text-[10px] uppercase tracking-widest ${activeSection === section.id ? "text-primary-foreground/70" : "text-muted-foreground/60"}`}>
                {activeSection === section.id ? "▼ Aberto" : "Clique para ver"}
              </span>
            </motion.button>
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
