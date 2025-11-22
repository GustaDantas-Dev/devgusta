import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Warehouse, Volume2, Globe, Bot, ClipboardList, FileText } from "lucide-react";

const projects = [
  {
    icon: Warehouse,
    title: "Sistema de Armazém Inteligente",
    description: "IoT + Fullstack + Automação com Arduino/ESP32 integrado a sensores de peso (HX711), RFID (RC522), infravermelho e display LCD. Envio de alertas automáticos para Telegram com lógica de gestão de estoque.",
    tech: ["ESP32", "Arduino", "RFID", "Telegram Bot", "IoT", "Sensores"],
    link: "https://wa.me/5592993232190?text=Olá! Tenho interesse no projeto Armazém Inteligente."
  },
  {
    icon: Volume2,
    title: "Software de Competição de Gritos",
    description: "ESP32 + HTML/CSS/JS com interface web local para medir volume do público por microfone. Dashboard em tempo real mostrando níveis e vencedor da rodada. Ideal para eventos com votação por barulho.",
    tech: ["ESP32", "JavaScript", "HTML/CSS", "Web Interface", "Sensores"],
    link: "https://wa.me/5592993232190?text=Olá! Tenho interesse no projeto Competição de Gritos."
  },
  {
    icon: Globe,
    title: "Sites Profissionais",
    description: "TH Rastreamento: página institucional, serviços e integração WhatsApp. LETRAN – Leão Transporte: site para motoristas autônomos. Barbearia: site visual com horários e serviços. Portfólios para filmmaker, advogado e arquiteto.",
    tech: ["HTML/CSS", "JavaScript", "Responsive", "WhatsApp API", "UI/UX"],
    link: "https://wa.me/5592993232190?text=Olá! Tenho interesse em desenvolvimento de sites profissionais."
  },
  {
    icon: Bot,
    title: "Digitalização de Cardápios + Chatbot",
    description: "Criação de cardápios digitais com chatbot/assistente para registrar pedidos automaticamente. Redução de erros e maior agilidade para lanchonetes e restaurantes.",
    tech: ["Chatbot", "JavaScript", "Automation", "UI/UX"],
    link: "https://wa.me/5592993232190?text=Olá! Tenho interesse no projeto Cardápios Digitais."
  },
  {
    icon: ClipboardList,
    title: "Projeto Sistema Prisional",
    description: "Organização estilo Trello/Kanban com módulos completos: cadastro de detento, visitas, disciplina, movimentação, relatórios e autenticação. Excelente demonstração de capacidade de análise, documentação e arquitetura.",
    tech: ["Análise", "Documentação", "Trello/Kanban", "DER/MER", "BPMN"],
    link: "https://wa.me/5592993232190?text=Olá! Tenho interesse no projeto Sistema Prisional."
  },
  {
    icon: FileText,
    title: "Documentações Técnicas",
    description: "DERs, MERs, diagramas de casos de uso, fluxos BPMN, modelos de teste. Resumos expandidos padronizados pela ABNT. Documentos profissionais para sistemas diversos demonstrando capacidade técnica completa.",
    tech: ["Documentação", "DER/MER", "BPMN", "Casos de Uso", "ABNT"],
    link: "https://wa.me/5592993232190?text=Olá! Gostaria de ver suas documentações técnicas."
  }
];

export const Projects = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className="h-full border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300 hover:shadow-glow flex flex-col">
            <CardHeader>
              <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <project.icon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-primary">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <CardDescription className="text-muted-foreground mb-4 flex-1">
                {project.description}
              </CardDescription>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="bg-secondary/10 border-secondary/30 text-secondary"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full border-primary/50 hover:bg-primary/10"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  Saiba Mais
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
