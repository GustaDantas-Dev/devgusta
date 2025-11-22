import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Mail, Linkedin, Github } from "lucide-react";
import { toast } from "sonner";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.name.length < 3) {
      toast.error("Nome deve ter no mínimo 3 caracteres");
      return;
    }

    if (formData.subject.length < 5) {
      toast.error("Assunto deve ter no mínimo 5 caracteres");
      return;
    }

    if (formData.message.length < 10) {
      toast.error("Mensagem deve ter no mínimo 10 caracteres");
      return;
    }

    const whatsappMessage = `*Nova mensagem do portfólio*%0A%0A*Nome:* ${encodeURIComponent(formData.name)}%0A*Assunto:* ${encodeURIComponent(formData.subject)}%0A*Mensagem:*%0A${encodeURIComponent(formData.message)}%0A%0A_Enviado via formulário do portfólio_`;
    
    window.open(`https://wa.me/5592993232190?text=${whatsappMessage}`, "_blank", "noopener,noreferrer");
    
    toast.success("Redirecionando para WhatsApp...");
    setFormData({ name: "", subject: "", message: "" });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">WhatsApp</h3>
              <a 
                href="https://wa.me/5592993232190" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                (92) 99323-2190
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">E-mail</h3>
              <a 
                href="mailto:gustavo.fmm98@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors break-all"
              >
                gustavo.fmm98@gmail.com
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            variant="outline"
            size="icon"
            className="w-14 h-14 rounded-full border-border hover:bg-gradient-primary hover:border-transparent transition-all"
            asChild
          >
            <a 
              href="https://www.linkedin.com/in/gustavo-dantas-7b8b6a203" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="w-14 h-14 rounded-full border-border hover:bg-gradient-primary hover:border-transparent transition-all"
            asChild
          >
            <a 
              href="https://github.com/gustavolimadantas" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Envie uma mensagem via WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Seu nome *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="subject">Assunto *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Digite o assunto da mensagem"
                  required
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="message">Sua mensagem *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Digite sua mensagem aqui..."
                  required
                  className="min-h-[120px] bg-background/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-glow-lg transition-all gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar para WhatsApp
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
