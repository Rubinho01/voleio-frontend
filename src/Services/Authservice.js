const BASE = "/api";

/**
 * Realiza login e retorna o token JWT.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string }>}
 */
export async function loginRequest(email, password) {
  const response = await fetch(`${BASE}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let message = "Credenciais inválidas.";
    try {
      const data = await response.json();
      message = data.message ?? data.error ?? message;
    } catch {
    }
    throw new Error(message);
  }

  return response.json();
}
