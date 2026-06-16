import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Whatsapp", href: "#" },
];

const EMPTY_FORM = {
  reference: "", description: "", timeReference: "",
  priceOfReference: "", startTime: "", endTime: "",
};

export default function Dashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [quadras, setQuadras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // Modal
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [quadraSelecionada, setQuadraSelecionada] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [salvando, setSalvando] = useState(false);
  const [erroModal, setErroModal] = useState("");

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    buscarQuadras();
  }, [token]);

  const buscarQuadras = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/courts/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao buscar quadras.");
      const data = await res.json();
      setQuadras(data);
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  };

  const abrirModalNova = () => {
    setModoEdicao(false);
    setQuadraSelecionada(null);
    setForm(EMPTY_FORM);
    setErroModal("");
    setModalAberto(true);
  };

  const abrirModalEdicao = (quadra) => {
    setModoEdicao(true);
    setQuadraSelecionada(quadra);
    setForm({
      reference: quadra.reference || "",
      description: quadra.description || "",
      timeReference: quadra.timeReference || "",
      priceOfReference: quadra.priceOfReference || "",
      startTime: quadra.startTime || "",
      endTime: quadra.endTime || "",
    });
    setErroModal("");
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setErroModal("");
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const salvar = async () => {
    setErroModal("");
    if (!form.reference.trim()) { setErroModal("Informe o nome da quadra."); return; }
    if (!form.priceOfReference) { setErroModal("Informe o preço."); return; }
    if (!form.startTime || !form.endTime) { setErroModal("Informe os horários."); return; }

    setSalvando(true);
    try {
      const payload = {
        reference: form.reference,
        description: form.description,
        timeReference: Number(form.timeReference) || 60,
        priceOfReference: Number(form.priceOfReference),
        startTime: form.startTime,
        endTime: form.endTime,
      };

      if (modoEdicao) {
        const res = await fetch(`/api/courts/${quadraSelecionada.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Erro ao atualizar quadra.");
        await buscarQuadras();
      } else {
        const res = await fetch("/api/courts/add", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Erro ao criar quadra.");
        await buscarQuadras();
      }
      fecharModal();
    } catch (e) {
      setErroModal(e.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <span className={styles.logo}>◈ Voleio — Dashboard</span>
        <nav className={styles.navLinks}>
          <a href="/quadras" className={styles.navLink}>Ver como usuário</a>
          <button className={styles.logoutBtn} onClick={() => { logout(); navigate("/login"); }}>
            Sair
          </button>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <h1 className={styles.titulo}>Minhas Quadras</h1>
          <button className={styles.btnAdicionar} onClick={abrirModalNova}>
            + Nova Quadra
          </button>
        </div>

        {loading && <p className={styles.msg}>Carregando quadras...</p>}
        {erro && <p className={styles.msgErro}>{erro}</p>}

        <div className={styles.grid}>
          {quadras.map((quadra) => (
            <div key={quadra.id} className={styles.card}>
              <img
                src="/images/quadra-tennis.jpg"
                alt={quadra.reference}
                className={styles.cardImg}
              />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitulo}>{quadra.reference}</h3>
                <p className={styles.cardInfo}>R$ {Number(quadra.priceOfReference).toFixed(2).replace(".", ",")}</p>
                <p className={styles.cardInfo}>{quadra.startTime} – {quadra.endTime}</p>
                <p className={styles.cardInfo}>{quadra.timeReference} min</p>
                {quadra.description && (
                  <p className={styles.cardDesc}>{quadra.description}</p>
                )}
                <button
                  className={styles.btnEditar}
                  onClick={() => abrirModalEdicao(quadra)}
                >
                  ✏️ Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {modalAberto && (
        <div className={styles.modalOverlay} onClick={fecharModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitulo}>
                {modoEdicao ? "Editar Quadra" : "Nova Quadra"}
              </h2>
              <button className={styles.modalFechar} onClick={fecharModal}>✕</button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.inputWrapper}>
                <label className={styles.inputLabel}>Nome da quadra</label>
                <input className={styles.input} placeholder="Ex: Quadra 1" value={form.reference} onChange={set("reference")} />
              </div>

              <div className={styles.inputWrapper}>
                <label className={styles.inputLabel}>Descrição</label>
                <input className={styles.input} placeholder="Descrição opcional" value={form.description} onChange={set("description")} />
              </div>

              <div className={styles.rowDois}>
                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel}>Horário de abertura</label>
                  <input className={styles.input} type="time" value={form.startTime} onChange={set("startTime")} />
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel}>Horário de encerramento</label>
                  <input className={styles.input} type="time" value={form.endTime} onChange={set("endTime")} />
                </div>
              </div>

              <div className={styles.rowDois}>
                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel}>Preço (R$)</label>
                  <input className={styles.input} type="number" placeholder="Ex: 100" value={form.priceOfReference} onChange={set("priceOfReference")} />
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel}>Duração (min)</label>
                  <input className={styles.input} type="number" placeholder="Ex: 60" value={form.timeReference} onChange={set("timeReference")} />
                </div>
              </div>

              {erroModal && <p className={styles.erro}>{erroModal}</p>}

              <div className={styles.modalFooter}>
                <button className={styles.btnCancelar} onClick={fecharModal}>Cancelar</button>
                <button className={styles.btnSalvar} onClick={salvar} disabled={salvando}>
                  {salvando ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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