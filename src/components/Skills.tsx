import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const hardSkills = [
  "HTML", "CSS", "JavaScript", "Java", "Python", "C/C++",
  "Front-end", "Back-end", "Banco de Dados", "SQL",
  "APIs & Integrações", "Telegram Bot", "IoT", "Arduino",
  "ESP32", "RFID", "Sensores", "Power BI",
  "Trello/Kanban", "Git/GitHub", "Draw.io", "Graphviz",
  "Scrum", "Testes Funcionais", "Inglês Intermediário"
];

const softSkills = [
  "Comunicação Clara", "Organização", "Documentação",
  "Proatividade", "Resolução de Problemas", "Trabalho em Equipe",
  "Colaboração", "Autonomia", "Aprendizado Contínuo", "Pesquisa"
];

export const Skills = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <span className="text-2xl">💻</span>
              Hard Skills (Técnicas)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {hardSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.02 }}
                >
                  <Badge
                    variant="outline"
                    className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur hover:border-secondary/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-secondary flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Soft Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.02 }}
                >
                  <Badge
                    variant="outline"
                    className="bg-secondary/10 border-secondary/30 text-secondary hover:bg-secondary/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
