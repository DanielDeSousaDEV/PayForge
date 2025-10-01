import { Link } from "@inertiajs/react"
import { Github, Linkedin, Home, User, ShoppingCart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] mt-8">
      <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-[var(--color-text-muted)]">
        
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-2xl font-heading font-bold text-[var(--color-primary)]">
            PayForge
          </h4>
          <p className="text-sm leading-relaxed">
            Sua plataforma moderna para compras online rápidas, seguras e confiáveis.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Produzido por{" "}
            <a
              href="https://github.com/DanielDeSousaDEV"
              className="text-[var(--color-primary)] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Daniel De Sousa
            </a>
          </p>
        </div>

        <div>
          <h5 className="text-sm font-semibold uppercase mb-3 text-[var(--color-text)]">
            Navegação
          </h5>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/" className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors">
              <Home className="size-4" /> Home
            </Link>
            <Link href="/profile" className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors">
              <User className="size-4" /> Profile
            </Link>
            <Link href="/cart" className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors">
              <ShoppingCart className="size-4" /> Cart
            </Link>
          </nav>
        </div>

        <div>
          <h5 className="text-sm font-semibold uppercase mb-3 text-[var(--color-text)]">
            Conecte-se
          </h5>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href="https://github.com/DanielDeSousaDEV"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors"
            >
              <Github className="size-4" /> Github
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-de-sousa-257275314/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors"
            >
              <Linkedin className="size-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] py-4 text-center text-xs text-[var(--color-text-muted)]">
        © {new Date().getFullYear()} PayForge — Todos os direitos reservados.
      </div>
    </footer>
  )
}
