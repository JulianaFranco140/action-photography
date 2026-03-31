import Link from "next/link";
import styles from "./AuthCard.module.css";

type AuthMode = "login" | "register";

type AuthCardProps = {
  mode: AuthMode;
};

export default function AuthCard({ mode }: AuthCardProps) {
  const isLogin = mode === "login";
  const content = isLogin
    ? {
        heroTitle: "Bienvenida de nuevo",
        heroDescription: "Inicia sesion para encontrar tus fotos, revisar eventos recientes y guardar tus favoritos.",
        bullets: ["Busqueda rapida por evento", "Acceso a tus galerias favoritas", "Historial de competencias"],
      }
    : {
        heroTitle: "Crea tu cuenta",
        heroDescription:
          "Registrate para acceder a eventos, encontrar tus fotos y recibir novedades de competencias.",
        bullets: ["Perfil personalizado por equipo", "Alertas de nuevas galerias", "Favoritos y colecciones privadas"],
      };

  return (
    <main className={styles.page}>
      <section className={styles.authCard}>
        <div className={styles.welcomePanel}>
          <div className={styles.welcomeTop}>
            <img className={styles.brandLogo} src="/Logo Action Blanco.svg" alt="Logo Action Photography" />
            <p className={styles.kicker}>Action Photography</p>
          </div>

          <div className={styles.welcomeBody}>
            <h1>{content.heroTitle}</h1>
            <p className={styles.description}>{content.heroDescription}</p>
            <ul className={styles.bullets}>
              {content.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <p className={styles.switchText}>
            {isLogin ? (
              <>
                ¿No tienes cuenta? <Link href="/register">Regístrate aquí</Link>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta? <Link href="/login">Inicia sesión aquí</Link>
              </>
            )}
          </p>
        </div>

        <div className={styles.formPanel}>
          <Link href="/" className={styles.homeLink} aria-label="Volver al inicio" title="Inicio">
            <span className={styles.homeIcon}>←</span>
            <span className={styles.homeText}>Inicio</span>
          </Link>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </section>
    </main>
  );
}

function LoginForm() {
  return (
    <>
      <h2>Iniciar sesion</h2>
      <form className={styles.form}>
        <label htmlFor="email">Correo electronico</label>
        <input id="email" type="email" placeholder="tu@email.com" required />

        <label htmlFor="password">Contrasena</label>
        <input id="password" type="password" placeholder="********" required />

        <div className={styles.formOptions}>
          <label className={styles.checkRow}>
            <input type="checkbox" />
            Recordarme
          </label>
          <a href="#">Olvidé mi contraseña</a>
        </div>

        <button type="submit">Entrar</button>
      </form>
    </>
  );
}

function RegisterForm() {
  return (
    <>
      <h2>Registro</h2>
      <form className={styles.form}>
        <label htmlFor="fullName">Nombre completo</label>
        <input id="fullName" type="text" placeholder="Tu nombre" required />

        <label htmlFor="registerEmail">Correo electronico</label>
        <input id="registerEmail" type="email" placeholder="tu@email.com" required />

        <label htmlFor="team">Equipo (opcional)</label>
        <input id="team" type="text" placeholder="Nombre del equipo" />

        <label htmlFor="registerPassword">Contraseña</label>
        <input id="registerPassword" type="password" placeholder="********" required />

        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <input id="confirmPassword" type="password" placeholder="********" required />

        <label className={styles.checkRow}>
          <input type="checkbox" required />
          Acepto términos y condiciones
        </label>

        <button type="submit">Crear cuenta</button>
      </form>
    </>
  );
}
