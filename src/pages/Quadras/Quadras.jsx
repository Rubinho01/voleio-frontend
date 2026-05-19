import { useState } from "react";
import styles from "./Quadras.module.css";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Quadras", href: "/quadras" },
  { label: "Reservas", href: "/reservas" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Whatsapp", href: "#" },
];

// Dados mockados — substituir pela API quando backend estiver pronto
const QUADRAS_MOCK = [
  {
    id: 1,
    reference: "Quadra 1",
    priceOfReference: 100.0,
    address: "Rua X",
    timeReference: 60,
    image: "/images/quadras-de-tenis-cobertas-modalidades-4d.jpg",
  },
  {
    id: 2,
    reference: "Quadra 2",
    priceOfReference: 120.0,
    address: "Rua Y",
    timeReference: 60,
    image: "/images/quadra-indoor.jpg",
  },
  {
    id: 3,
    reference: "Quadra 3",
    priceOfReference: 90.0,
    address: "Rua Z",
    timeReference: 60,
    image: "/images/como-montar-quadra-de-tenisd.jpg",
  },
];

export default function Quadras() {
  const [busca, setBusca] = useState("");

  const quadrasFiltradas = QUADRAS_MOCK.filter((q) =>
    q.reference.toLowerCase().includes(busca.toLowerCase()) ||
    q.address.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <nav className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
          <button className={styles.navIcon}>🔔</button>
          <button className={styles.navIcon}>👤</button>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.searchRow}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            placeholder="Buscar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className={styles.filterBtn}>⚙</button>
        </div>

        <div className={styles.grid}>
          {quadrasFiltradas.map((quadra) => (
            <a key={quadra.id} href={`/reservar/${quadra.id}`} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  {quadra.reference.toUpperCase().split("").join(" ")}
                </span>
              </div>
              <img
                src={quadra.image}
                alt={quadra.reference}
                className={styles.cardImg}
              />
              <div className={styles.cardBody}>
                <p className={styles.cardInfo}>
                  <strong>PREÇO: R$ {quadra.priceOfReference.toFixed(2).replace(".", ",")}</strong>
                </p>
                <p className={styles.cardInfo}>
                  <strong>ENDEREÇO: {quadra.address}</strong>
                </p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardTempo}>
                    Tempo: {quadra.timeReference}min
                  </span>
                  <button className={styles.infoBtn}>ℹ</button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>

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