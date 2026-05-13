import { useState, useEffect } from "react";
import styles from "./Home.module.css";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Whatsapp", href: "#" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.page}>
      <header className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoIcon}>◈</span>
          <span className={styles.logoText}>Voleio - Aluguéis de Quadras</span>
        </a>

        <nav className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ""}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
          <a href="/login" className={styles.navCta}>
            Fazer Login
          </a>
        </nav>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerTop : ""}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerMid : ""}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerBot : ""}`} />
        </button>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <img
            src="/images/quadra-tennis.jpg"
            alt="Quadra de tênis"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroBottom}>
          <img
            src="/images/quadra-indoor.jpg"
            alt="Quadra indoor"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroDivider} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleWord}>Reserva</span>{" "}
            <span className={styles.heroTitleWord}>de</span>{" "}
            <span className={styles.heroTitleWord}>Quadras</span>
          </h1>

          <div className={styles.heroCtas}>
            <a href="/cadastro" className={styles.ctaDark}>
              Cadastre-se
            </a>
            <a href="/login" className={styles.ctaLight}>
              Login
            </a>
          </div>
        </div>
      </section>


      <footer className={styles.footer}>
        <p className={styles.footerCopy}>© 2026 Designed by Seninha team</p>
        <nav className={styles.footerSocial}>
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} className={styles.footerLink}>
              {s.label}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}
