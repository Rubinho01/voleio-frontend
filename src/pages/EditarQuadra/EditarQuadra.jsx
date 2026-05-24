import { useState } from "react";
import styles from "./EditarQuadra.module.css";

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
const QUADRA_MOCK = {
  id: 1,
  reference: "Quadra X",
  startTime: "",
  endTime: "",
  priceOfReference: "Preço",
  address: "Rua X",
  city: "Joinville",
  soloType: "Areia",
  modality: "Vôlei",
};

export default function EditarQuadra() {
  const [form, setForm] = useState(QUADRA_MOCK);
  const [imagens, setImagens] = useState([]);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleImageDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer?.files || e.target.files);
    setImagens(files);
  };

  const handleSalvar = async () => {
    setErro("");
    if (!form.reference.trim()) {
      setErro("Informe o nome da quadra."); return;
    }
    setLoading(true);
    try {
      // TODO: substituir pelo endpoint real quando backend estiver pronto
      // await fetch(`/api/courts/${form.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     reference: form.reference,
      //     startTime: form.startTime,
      //     endTime: form.endTime,
      //     priceOfReference: form.priceOfReference,
      //     address: form.address,
      //     city: form.city,
      //     soloType: form.soloType,
      //     modality: form.modality,
      //   }),
      // });
      await new Promise((r) => setTimeout(r, 800));
      setSucesso(true);
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
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
        {/* Card esquerdo */}
        <div className={styles.card}>
          <h2 className={styles.title}>EDITAR QUADRA</h2>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Nome da quadra</label>
            <input
              className={styles.input}
              placeholder="Nome da quadra"
              value={form.reference}
              onChange={set("reference")}
            />
            {form.reference.trim().length > 1 && (
              <span className={styles.check}>✓</span>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Horário de abertura</label>
            <input
              className={styles.input}
              type="time"
              value={form.startTime}
              onChange={set("startTime")}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Horário de encerramento</label>
            <input
              className={styles.input}
              type="time"
              value={form.endTime}
              onChange={set("endTime")}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Preço</label>
            <input
              className={styles.input}
              placeholder="Preço"
              value={form.priceOfReference}
              onChange={set("priceOfReference")}
            />
            {form.priceOfReference.toString().trim().length > 0 && (
              <span className={styles.check}>✓</span>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Endereço</label>
            <input
              className={styles.input}
              placeholder="Rua X"
              value={form.address}
              onChange={set("address")}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Cidade</label>
            <input
              className={styles.input}
              placeholder="Cidade"
              value={form.city}
              onChange={set("city")}
            />
          </div>
        </div>

        {/* Card direito */}
        <div className={styles.card}>
          <div className={styles.rowDois}>
            <div className={styles.inputWrapper}>
              <label className={styles.inputLabel}>Tipo de solo</label>
              <input
                className={styles.input}
                placeholder="Areia"
                value={form.soloType}
                onChange={set("soloType")}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.inputLabel}>Modalidade</label>
              <input
                className={styles.input}
                placeholder="Vôlei"
                value={form.modality}
                onChange={set("modality")}
              />
            </div>
          </div>

          <div
            className={styles.uploadArea}
            onDrop={handleImageDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              className={styles.uploadInput}
              onChange={handleImageDrop}
              id="upload"
            />
            <label htmlFor="upload" className={styles.uploadLabel}>
              <span className={styles.uploadIcon}>⬆</span>
              <span>
                {imagens.length > 0
                  ? `${imagens.length} imagem(ns) selecionada(s)`
                  : "Arraste as imagens ou clique e faça upload"}
              </span>
            </label>
          </div>

          {erro && <p className={styles.erro}>{erro}</p>}
          {sucesso && <p className={styles.sucesso}>✅ Quadra salva com sucesso!</p>}

          <button
            className={styles.btnSalvar}
            onClick={handleSalvar}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
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