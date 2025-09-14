import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Produto",
    links: [
      { label: "Como Funciona", href: "/how-it-works" },
      { label: "Análise", href: "/analysis" },
      { label: "Recomendações", href: "/recommendations" },
      { label: "Dashboard", href: "/dashboard" }
    ]
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nós", href: "/about" },
      { label: "Equipe", href: "/team" },
      { label: "Carreiras", href: "/careers" },
      { label: "Blog", href: "/blog" }
    ]
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de Ajuda", href: "/help" },
      { label: "Contato", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Status", href: "/status", external: true }
    ]
  },
  {
    title: "Legal", 
    links: [
      { label: "Privacidade", href: "/privacy" },
      { label: "Termos de Uso", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Disclaimer", href: "/disclaimer" }
    ]
  }
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: "📷" },
  { label: "LinkedIn", href: "#", icon: "💼" },
  { label: "Twitter", href: "#", icon: "🐦" },
  { label: "YouTube", href: "#", icon: "📺" }
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-navy text-primary-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h3 className="text-2xl font-heading font-bold">LoL Engine</h3>
                <p className="text-sm text-primary-white/80">
                  Powered by AI
                </p>
              </div>
              <p className="text-sm text-primary-white/70 mb-6 max-w-md">
                Recomendações personalizadas de suplementos baseadas em análise científica 
                e inteligência artificial avançada.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-primary-white/60 hover:text-primary-white transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h4 className="text-sm font-semibold text-primary-white mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-white/70 hover:text-primary-white transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-primary-white/70 hover:text-primary-white transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-primary-white/20" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <p className="text-sm text-primary-white/60">
              © {currentYear} LoL Engine. Todos os direitos reservados.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <p className="text-xs text-primary-white/50">
              Versão 1.0.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}