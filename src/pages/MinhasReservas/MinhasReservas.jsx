import { useState } from "react";
import styles from "./MinhasReservas.module.css";

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
const RESERVAS_MOCK = [
  {
    id: 1,
    courtName: "Quadra 5",
    date: "18/04/2026",
    address: "Rua Y",
    startTime: "19:00",
    endTime: "20:00",
    image: "/images/quadras-de-tenis-cobertas-modalidades-4d.jpg",
  },
  {
    id: 2,
    courtName: "Quadra 2",
    date: "25/04/2026",
    address: "Rua Z",
    startTime: "20:00",
    endTime: "21:00",
    image: "/images/brasscourt-quadras.png",
  },
];

export default function MinhasReservas() {
  const [busca, setBusca] = useState("");

  const reservasFiltradas = RESERVAS_MOCK.filter((r) =>
    r.courtName.toLowerCase().includes(busca.toLowerCase()) ||
    r.address.toLowerCase().includes(busca.toLowerCase())
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
          {reservasFiltradas.map((reserva) => (
            <div key={reserva.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  {reserva.courtName.toUpperCase().split("").join(" ")}
                </span>
              </div>
              <img
                src={reserva.image}
                alt={reserva.courtName}
                className={styles.cardImg}
              />
              <div className={styles.cardBody}>
                <p className={styles.cardInfo}>
                  <strong>DATA: {reserva.date}</strong>
                </p>
                <p className={styles.cardInfo}>
                  <strong>ENDEREÇO: {reserva.address}</strong>
                </p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardHorario}>
                    Horário: {reserva.startTime} – {reserva.endTime}
                  </span>
                  <button className={styles.infoBtn}>ℹ</button>
                </div>
              </div>
            </div>
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