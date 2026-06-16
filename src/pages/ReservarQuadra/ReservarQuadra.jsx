import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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

export default function ReservarQuadra() {
  const { id } = useParams();
  const { token } = useAuth();

  const [quadra, setQuadra] = useState(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [data, setData] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // Busca dados da quadra
  useEffect(() => {
    fetch("/api/courts/all", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((q) => q.id === Number(id));
        setQuadra(found || null);
      })
      .catch(() => setErro("Erro ao buscar quadra."))
      .finally(() => setLoading(false));
  }, [id, token]);

  // Busca horários disponíveis quando data muda
  useEffect(() => {
    if (!data || !id) return;
    setLoadingHorarios(true);
    setHorariosDisponiveis([]);
    setHorarioSelecionado("");

    fetch(`/api/reservations/available?date=${data}&courtId=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((times) => setHorariosDisponiveis(times))
      .catch(() => setErro("Erro ao buscar horários."))
      .finally(() => setLoadingHorarios(false));
  }, [data, id, token]);

  const handleReservar = async () => {
    setErro("");
    if (!data) { setErro("Selecione uma data."); return; }
    if (!horarioSelecionado) { setErro("Selecione um horário."); return; }

    setSalvando(true);
    try {
      const res = await fetch("/api/reservations/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reservationDate: data,
          courtId: Number(id),
          startTime: horarioSelecionado,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Erro ao criar reserva.");
      }
      setSucesso(true);
    } catch (e) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  };

  if (sucesso) {
    return (
      <div className={styles.page}>
        <div className={styles.sucessoBox}>
          <h2>✅ Reserva realizada com sucesso!</h2>
          <p>{quadra?.reference} — {data} às {horarioSelecionado}</p>
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
            <a key={link.label} href={link.href} className={styles.navLink}>{link.label}</a>
          ))}
          <button className={styles.navIcon}>🔔</button>
          <button className={styles.navIcon}>👤</button>
        </nav>
      </header>

      <main className={styles.main}>
        {loading ? (
          <p style={{ color: "#fff" }}>Carregando...</p>
        ) : !quadra ? (
          <p style={{ color: "#ff5252" }}>Quadra não encontrada.</p>
        ) : (
          <div className={styles.card}>
            <div className={styles.cardLeft}>
              <h1 className={styles.titulo}>{quadra.reference.toUpperCase()}</h1>
              <p className={styles.info}>Preço: R$ {Number(quadra.priceOfReference).toFixed(2).replace(".", ",")}</p>
              <p className={styles.info}>Horário: {quadra.startTime} – {quadra.endTime}</p>

              <div className={styles.inputWrapper}>
                <label className={styles.inputLabel}>Data da reserva</label>
                <input
                  className={styles.input}
                  type="date"
                  value={data}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>

              {loadingHorarios && <p className={styles.info}>Buscando horários...</p>}

              {horariosDisponiveis.length > 0 && (
                <div>
                  <p className={styles.info}>Horários disponíveis:</p>
                  <div className={styles.diasRow}>
                    {horariosDisponiveis.map((h) => (
                      <button
                        key={h}
                        className={`${styles.diaBtn} ${horarioSelecionado === h ? styles.diaBtnAtivo : ""}`}
                        onClick={() => setHorarioSelecionado(h)}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {data && horariosDisponiveis.length === 0 && !loadingHorarios && (
                <p className={styles.info}>Nenhum horário disponível para esta data.</p>
              )}

              {erro && <p className={styles.erro}>{erro}</p>}

              <button
                className={styles.btnReservar}
                onClick={handleReservar}
                disabled={salvando}
              >
                {salvando ? "Reservando..." : "Reservar"}
              </button>
            </div>

            <div className={styles.cardRight}>
              <img
                src="/images/quadra-tennis.jpg"
                alt={quadra.reference}
                className={styles.quadraImg}
              />
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerCopy}>© 2026 Designed by Seninha team</p>
        <nav className={styles.footerSocial}>
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} className={styles.footerLink}>{s.label}</a>
          ))}
        </nav>
      </footer>
    </div>
  );
}