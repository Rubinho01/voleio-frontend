import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
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

export default function MinhasReservas() {
  const { token } = useAuth();
  const [passadas, setPassadas] = useState([]);
  const [proximas, setProximas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [aba, setAba] = useState("proximas");

  useEffect(() => {
    if (!token) return;
    fetch("/api/reservations/my-reservations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Erro ao buscar reservas.");
        return r.json();
      })
      .then((data) => {
        setProximas(data.upcomingRentals || []);
        setPassadas(data.pastRentals || []);
      })
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  const reservasFiltradas = (aba === "proximas" ? proximas : passadas).filter((r) =>
    r.courtName.toLowerCase().includes(busca.toLowerCase())
  );

  const formatarData = (data) => {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

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

        <div className={styles.abasRow}>
          <button
            className={`${styles.aba} ${aba === "proximas" ? styles.abaAtiva : ""}`}
            onClick={() => setAba("proximas")}
          >
            Próximas ({proximas.length})
          </button>
          <button
            className={`${styles.aba} ${aba === "passadas" ? styles.abaAtiva : ""}`}
            onClick={() => setAba("passadas")}
          >
            Passadas ({passadas.length})
          </button>
        </div>

        {loading && <p className={styles.msg}>Carregando reservas...</p>}
        {erro && <p className={styles.msgErro}>{erro}</p>}

        {!loading && reservasFiltradas.length === 0 && (
          <p className={styles.msg}>Nenhuma reserva encontrada.</p>
        )}

        <div className={styles.grid}>
          {reservasFiltradas.map((reserva, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  {reserva.courtName.toUpperCase().split("").join(" ")}
                </span>
              </div>
              <img
                src="/images/quadra-tennis.jpg"
                alt={reserva.courtName}
                className={styles.cardImg}
              />
              <div className={styles.cardBody}>
                <p className={styles.cardInfo}>
                  <strong>DATA: {formatarData(reserva.date)}</strong>
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