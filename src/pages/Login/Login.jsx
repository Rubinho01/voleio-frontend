import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginRequest } from "../../services/authService";
import styles from "./Login.module.css";

export default function Login() {
  const { login } = useAuth();

  const [fields, setFields]     = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  function handleChange(e) {
    setError("");
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!fields.email || !fields.password) {
      setError("Preencha e-mail e senha.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await loginRequest(fields.email, fields.password);
      login(data.token);
      // Redirecione conforme sua necessidade:
      // navigate("/dashboard") se usar React Router
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgTop}>
        <img src="/images/quadra-tennis.jpg" alt="" className={styles.bgImg} />
        <div className={styles.bgOverlay} />
      </div>
      <div className={styles.bgBottom}>
        <img src="/images/quadra-indoor.jpg" alt="" className={styles.bgImg} />
        <div className={styles.bgOverlay} />
      </div>
      <div className={styles.bgDivider} />

      <main className={styles.card}>
        <a href="/" className={styles.backLink} aria-label="Voltar para o início">
          <span className={styles.backIcon}>←</span>
          <span className={styles.backText}>Voleio</span>
        </a>

        <header className={styles.cardHeader}>
          <h1 className={styles.title}>Entrar</h1>
          <p className={styles.subtitle}>Acesse sua conta para reservar uma quadra</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>✉</span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                className={styles.input}
                value={fields.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className={styles.input}
                value={fields.password}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {error && (
            <p className={styles.errorMsg} role="alert">
              {error}
            </p>
          )}

          <div className={styles.forgotRow}>
            <a href="/esqueci-senha" className={styles.forgotLink}>
              Esqueci minha senha
            </a>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span className={styles.spinner} aria-hidden="true" />
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className={styles.registerRow}>
          Não tem conta?{" "}
          <a href="/cadastro" className={styles.registerLink}>
            Cadastre-se
          </a>
        </p>
      </main>
    </div>
  );
}
