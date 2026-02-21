import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Mail, Linkedin, Github, Send } from "lucide-react";
import { toast } from "sonner";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
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
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <a
          href="https://wa.me/5592993232190"
          target="_blank"
          rel="noopener noreferrer"
          className="terminal-border rounded-lg bg-card/50 backdrop-blur flex items-center gap-4 p-4 hover:shadow-glow transition-all group"
        >
          <div className="w-12 h-12 rounded border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold text-card-foreground">WhatsApp</h3>
            <p className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">
              (92) 99323-2190
            </p>
          </div>
        </a>

        <a
          href="mailto:gustavo.fmm98@gmail.com"
          className="terminal-border rounded-lg bg-card/50 backdrop-blur flex items-center gap-4 p-4 hover:shadow-glow transition-all group"
        >
          <div className="w-12 h-12 rounded border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold text-card-foreground">E-mail</h3>
            <p className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors break-all">
              gustavo.fmm98@gmail.com
            </p>
          </div>
        </a>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded border-primary/20 hover:bg-primary/10 hover:border-primary/40 hover:shadow-glow transition-all"
            asChild
          >
            <a href="https://www.linkedin.com/in/gustavo-dantas-7b8b6a203" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 text-primary" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded border-primary/20 hover:bg-primary/10 hover:border-primary/40 hover:shadow-glow transition-all"
            asChild
          >
            <a href="https://github.com/gustavolimadantas" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-5 h-5 text-primary" />
            </a>
          </Button>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="terminal-border rounded-lg bg-card/50 backdrop-blur overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/10 bg-primary/5">
          <span className="w-3 h-3 rounded-full bg-destructive/60" />
          <span className="w-3 h-3 rounded-full bg-accent/60" />
          <span className="w-3 h-3 rounded-full bg-primary/60" />
          <span className="font-mono text-xs text-muted-foreground ml-2">send_message.sh</span>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="font-mono text-xs text-muted-foreground">
                <span className="text-primary">const</span> nome =
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background/50 border-primary/20 font-mono text-sm text-card-foreground focus:border-primary focus:shadow-glow"
                placeholder='"Seu nome"'
              />
            </div>

            <div>
              <Label htmlFor="subject" className="font-mono text-xs text-muted-foreground">
                <span className="text-primary">const</span> assunto =
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="bg-background/50 border-primary/20 font-mono text-sm text-card-foreground focus:border-primary focus:shadow-glow"
                placeholder='"Assunto da mensagem"'
              />
            </div>

            <div>
              <Label htmlFor="message" className="font-mono text-xs text-muted-foreground">
                <span className="text-primary">const</span> mensagem =
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="min-h-[100px] bg-background/50 border-primary/20 font-mono text-sm text-card-foreground focus:border-primary focus:shadow-glow"
                placeholder='"Sua mensagem aqui..."'
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow transition-all gap-2 font-mono text-sm"
            >
              <Send className="w-4 h-4" />
              execute --send-whatsapp
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
