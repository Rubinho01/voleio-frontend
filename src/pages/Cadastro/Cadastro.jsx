import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cadastro.module.css";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Whatsapp", href: "#" },
];

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "", email: "", cpf: "", senha: "", confirmaSenha: "", phone: "",
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirma, setMostrarConfirma] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const valid = {
    username: form.username.trim().length > 1,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    cpf: form.cpf.replace(/\D/g, "").length === 11,
    senha: form.senha.length >= 8,
    confirmaSenha: form.confirmaSenha.length >= 8 && form.confirmaSenha === form.senha,
    phone: form.phone.trim().length > 8,
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    setErro("");
    if (!valid.username) { setErro("Informe seu nome de usuário."); return; }
    if (!valid.email) { setErro("Informe um e-mail válido."); return; }
    if (!valid.cpf) { setErro("Informe um CPF válido (11 dígitos)."); return; }
    if (!valid.senha) { setErro("A senha deve ter pelo menos 8 caracteres."); return; }
    if (form.senha !== form.confirmaSenha) { setErro("As senhas não coincidem."); return; }

    setLoading(true);
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          cpf: form.cpf.replace(/\D/g, ""),
          password: form.senha,
          phone: form.phone,
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message ?? "Erro ao criar conta.");
      }
      navigate("/login");
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
        </nav>
      </header>

      <main className={styles.main}>
        {/* Card esquerdo */}
        <div className={styles.card}>
          <h2 className={styles.title}>Criar conta</h2>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Nome de usuário</label>
            <input className={styles.input} placeholder="Nome de usuário" value={form.username} onChange={set("username")} />
            {valid.username && <span className={styles.check}>✓</span>}
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Email</label>
            <input className={styles.input} type="email" placeholder="exemplo@gmail.com" value={form.email} onChange={set("email")} />
            {valid.email && <span className={styles.check}>✓</span>}
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>CPF</label>
            <input className={styles.input} placeholder="000.000.000-00" value={form.cpf} onChange={set("cpf")} maxLength={14} />
            {valid.cpf && <span className={styles.check}>✓</span>}
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Senha</label>
            <input className={styles.input} type={mostrarSenha ? "text" : "password"} placeholder="********" value={form.senha} onChange={set("senha")} />
            {valid.senha && <span className={styles.check}>✓</span>}
            <button type="button" className={styles.eyeBtn} onClick={() => setMostrarSenha(v => !v)}>👁</button>
          </div>
          <p className={styles.hint}>8+ caracteres</p>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Confirme sua senha</label>
            <input className={styles.input} type={mostrarConfirma ? "text" : "password"} placeholder="********" value={form.confirmaSenha} onChange={set("confirmaSenha")} />
            {valid.confirmaSenha && <span className={styles.check}>✓</span>}
            <button type="button" className={styles.eyeBtn} onClick={() => setMostrarConfirma(v => !v)}>👁</button>
          </div>
          <p className={styles.hint}>8+ caracteres</p>
        </div>

        {/* Card direito */}
        <div className={styles.card}>
          <div className={styles.telefoneRow}>
            <div className={`${styles.inputWrapper} ${styles.ddi}`}>
              <select className={styles.select}>
                <option>+55</option>
                <option>+1</option>
                <option>+351</option>
              </select>
            </div>
            <div className={`${styles.inputWrapper} ${styles.telefoneInput}`}>
              <label className={styles.inputLabel}>Número de telefone</label>
              <input className={styles.input} placeholder="Número de telefone" value={form.phone} onChange={set("phone")} />
              {valid.phone && <span className={styles.check}>✓</span>}
            </div>
          </div>

          {erro && <p className={styles.erro}>{erro}</p>}

          <button className={styles.btnSalvar} onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : "Salvar informações"}
          </button>

          <p className={styles.terms}>
            Clicando em "Salvar informações" eu concordo com os termos de uso e com a política de privacidade.
          </p>
        </div>
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