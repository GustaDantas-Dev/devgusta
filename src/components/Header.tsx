import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: "sobre", label: "./sobre" },
    { id: "portfolio", label: "./portfolio" },
    { id: "contato", label: "./contato" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-primary/20"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between" aria-label="Menu principal">
        <motion.div
          className="flex items-center gap-2 cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          onClick={() => scrollToSection("sobre")}
        >
          <Terminal className="w-5 h-5 text-primary" />
          <span className="text-lg font-mono font-bold text-primary text-glow">
            gld@dev
          </span>
          <span className="text-muted-foreground font-mono text-sm">:~$</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded hover:bg-primary/5"
            >
              {link.label}
            </button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-primary/20 md:hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors text-left py-2 border-b border-primary/10 last:border-0"
                  >
                    <span className="text-primary mr-2">$</span>
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};
