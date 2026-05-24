import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ReservarQuadra.module.css";

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
const QUADRAS_MOCK = {
  1: {
    id: 1,
    reference: "Quadra 1",
    priceOfReference: 100.0,
    address: "Rua X",
    timeReference: 60,
    image: "/images/quadras-de-tenis-cobertas-modalidades-4d.jpg",
    startTime: "19:00",
    endTime: "20:00",
  },
  2: {
    id: 2,
    reference: "Quadra 2",
    priceOfReference: 120.0,
    address: "Rua Y",
    timeReference: 60,
    image: "/images/quadra-indoor.jpg",
    startTime: "20:00",
    endTime: "21:00",
  },
  3: {
    id: 3,
    reference: "Quadra 3",
    priceOfReference: 90.0,
    address: "Rua Z",
    timeReference: 60,
    image: "/images/como-montar-quadra-de-tenisd.jpg",
    startTime: "19:00",
    endTime: "20:00",
  },
};

const DIAS_SEMANA = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

export default function ReservarQuadra() {
  const { id } = useParams();
  const quadra = QUADRAS_MOCK[id] || QUADRAS_MOCK[1];

  const [nomeReserva, setNomeReserva] = useState("");
  const [data, setData] = useState("");
  const [diaSelecionado, setDiaSelecionado] = useState("SAB");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const nomeValido = nomeReserva.trim().length > 1;

  const handleReservar = async () => {
    setErro("");
    if (!nomeValido) {
      setErro("Informe o nome da reserva."); return;
    }
    if (!data) {
      setErro("Selecione uma data."); return;
    }
    setLoading(true);
    try {
      // TODO: substituir pelo endpoint real quando backend estiver pronto
      // await fetch("/api/rentals", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     courtId: quadra.id,
      //     rentalName: nomeReserva,
      //     date: data,
      //     startTime: quadra.startTime,
      //     endTime: quadra.endTime,
      //   }),
      // });
      await new Promise((r) => setTimeout(r, 800)); // simula chamada API
      setSucesso(true);
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (sucesso) {
    return (
      <div className={styles.page}>
        <div className={styles.sucessoBox}>
          <h2>✅ Reserva realizada com sucesso!</h2>
          <p>{quadra.reference} — {data}</p>
          <a href="/reservas" className={styles.btnVoltar}>Ver minhas reservas</a>
        </div>
      </div>
    );
  }

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
        <div className={styles.card}>
          <div className={styles.cardLeft}>
            <h1 className={styles.titulo}>{quadra.reference.toUpperCase()}</h1>
            <p className={styles.info}>Endereço: {quadra.address}</p>
            <p className={styles.info}>Preço: R$ {quadra.priceOfReference.toFixed(2).replace(".", ",")}</p>

            <div className={styles.inputWrapper}>
              <label className={styles.inputLabel}>Nome da reserva</label>
              <input
                className={styles.input}
                placeholder="Seu nome"
                value={nomeReserva}
                onChange={(e) => setNomeReserva(e.target.value)}
              />
              {nomeValido && <span className={styles.check}>✓</span>}
            </div>

            <div className={styles.diasRow}>
              {DIAS_SEMANA.map((dia) => (
                <button
                  key={dia}
                  className={`${styles.diaBtn} ${diaSelecionado === dia ? styles.diaBtnAtivo : ""}`}
                  onClick={() => setDiaSelecionado(dia)}
                >
                  {dia}
                </button>
              ))}
            </div>

            {diaSelecionado && (
              <div className={styles.horarioBox}>
                <p className={styles.horarioTitulo}>{diaSelecionado === "SAB" ? "Sábado" : diaSelecionado}</p>
                <p className={styles.horarioInfo}>Horário início: {quadra.startTime}</p>
                <p className={styles.horarioInfo}>Horário fim: {quadra.endTime}</p>
              </div>
            )}

            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="DD/MM/AAAA"
              />
            </div>

            {erro && <p className={styles.erro}>{erro}</p>}

            <button
              className={styles.btnReservar}
              onClick={handleReservar}
              disabled={loading}
            >
              {loading ? "Reservando..." : "Reservar"}
            </button>
          </div>

          <div className={styles.cardRight}>
            <img
              src={quadra.image}
              alt={quadra.reference}
              className={styles.quadraImg}
            />
          </div>
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