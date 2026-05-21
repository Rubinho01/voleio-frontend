import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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

export default function Quadras() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [quadras, setQuadras] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("/api/courts/all", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Erro ao buscar quadras.");
        return r.json();
      })
      .then((data) => setQuadras(data))
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, [token, navigate]);

  const quadrasFiltradas = quadras.filter((q) =>
    q.reference.toLowerCase().includes(busca.toLowerCase())
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

        {loading && <p className={styles.msg}>Carregando quadras...</p>}
        {erro && <p className={styles.msgErro}>{erro}</p>}

        <div className={styles.grid}>
          {quadrasFiltradas.map((quadra) => (
            <a key={quadra.id} href={`/reservar/${quadra.id}`} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  {quadra.reference.toUpperCase().split("").join(" ")}
                </span>
              </div>
              <img
                src="/images/quadra-tennis.jpg"
                alt={quadra.reference}
                className={styles.cardImg}
              />
              <div className={styles.cardBody}>
                <p className={styles.cardInfo}>
                  <strong>PREÇO: R$ {Number(quadra.priceOfReference).toFixed(2).replace(".", ",")}</strong>
                </p>
                <p className={styles.cardInfo}>
                  <strong>TEMPO: {quadra.timeReference} min</strong>
                </p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardTempo}>
                    {quadra.startTime} – {quadra.endTime}
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