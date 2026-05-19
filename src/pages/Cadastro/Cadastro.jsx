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

const ESPORTES = ["Tênis", "Futsal", "Futebol sintético"];

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "", primeiroNome: "", email: "", senha: "", confirmaSenha: "",
    dataNascimento: "", telefone: "", endereco: "", cidade: "",
    estado: "", cep: "", esportes: [],
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirma, setMostrarConfirma] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const valid = {
    nome: form.nome.trim().length > 1,
    primeiroNome: form.primeiroNome.trim().length > 1,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    senha: form.senha.length >= 8,
    confirmaSenha: form.confirmaSenha.length >= 8 && form.confirmaSenha === form.senha,
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const toggleEsporte = (esporte) => {
    setForm((f) => ({
      ...f,
      esportes: f.esportes.includes(esporte)
        ? f.esportes.filter((e) => e !== esporte)
        : [...f.esportes, esporte],
    }));
  };

  const handleSubmit = async () => {
    setErro("");
    if (!valid.nome || !valid.primeiroNome || !valid.email) {
      setErro("Preencha nome, sobrenome e e-mail corretamente."); return;
    }
    if (!valid.senha) {
      setErro("A senha deve ter pelo menos 8 caracteres."); return;
    }
    if (form.senha !== form.confirmaSenha) {
      setErro("As senhas não coincidem."); return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.primeiroNome} ${form.nome}`,
          email: form.email,
          password: form.senha,
          phone: form.telefone,
          address: form.endereco,
          city: form.cidade,
          state: form.estado,
          zipCode: form.cep,
          birthDate: form.dataNascimento || null,
          sports: form.esportes,
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
            <label className={styles.inputLabel}>Nome</label>
            <input className={styles.input} placeholder="Nome" value={form.nome} onChange={set("nome")} />
            {valid.nome && <span className={styles.check}>✓</span>}
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Primeiro nome</label>
            <input className={styles.input} placeholder="Primeiro nome" value={form.primeiroNome} onChange={set("primeiroNome")} />
            {valid.primeiroNome && <span className={styles.check}>✓</span>}
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Email</label>
            <input className={styles.input} type="email" placeholder="exemplo@gmail.com" value={form.email} onChange={set("email")} />
            {valid.email && <span className={styles.check}>✓</span>}
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

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Data de nascimento</label>
            <input className={styles.input} type="date" value={form.dataNascimento} onChange={set("dataNascimento")} />
            <span className={styles.opcional}>Opcional</span>
          </div>
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
              <input className={styles.input} placeholder="Número de telefone" value={form.telefone} onChange={set("telefone")} />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Endereço</label>
            <input className={styles.input} placeholder="Rua exemplo, 123" value={form.endereco} onChange={set("endereco")} />
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Cidade</label>
            <input className={styles.input} placeholder="Cidade" value={form.cidade} onChange={set("cidade")} />
          </div>

          <div className={styles.rowDois}>
            <div className={styles.inputWrapper}>
              <label className={styles.inputLabel}>Estado</label>
              <input className={styles.input} placeholder="Estado" value={form.estado} onChange={set("estado")} />
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.inputLabel}>CEP</label>
              <input className={styles.input} placeholder="12345-67" value={form.cep} onChange={set("cep")} />
            </div>
          </div>

          <div className={styles.esportesRow}>
            <span className={styles.esportesLabel}>Esportes que pratico:</span>
            {ESPORTES.map((e) => (
              <label key={e} className={styles.esporteItem}>
                <input
                  type="checkbox"
                  checked={form.esportes.includes(e)}
                  onChange={() => toggleEsporte(e)}
                  className={styles.radio}
                />
                {e}
              </label>
            ))}
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