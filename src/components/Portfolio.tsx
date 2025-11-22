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
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-primary bg-clip-text text-transparent">Meu Portfólio</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Explore minhas habilidades, experiências profissionais e projetos desenvolvidos
        </motion.p>

        {/* Section Toggles */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              className={`gap-2 ${
                activeSection === section.id
                  ? "bg-gradient-primary hover:shadow-glow-lg"
                  : "border-border hover:bg-muted"
              }`}
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
            >
              <section.icon className="w-5 h-5" />
              {section.label}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="min-h-[400px]">
          {activeSection === "skills" && <Skills />}
          {activeSection === "experience" && <Experience />}
          {activeSection === "projects" && <Projects />}
          
          {!activeSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground py-20"
            >
              <p className="text-lg">Selecione uma opção acima para ver o conteúdo</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
