import Link from "next/link";
import styles from "./AuthCard.module.css";

type AuthMode = "login" | "register" | "recover" | "recover-code";

type AuthCardProps = {
  mode: AuthMode;
};

export default function AuthCard({ mode }: AuthCardProps) {
  const isLogin = mode === "login";
  const isRecover = mode === "recover";
  const isRecoverCode = mode === "recover-code";
  const content = isLogin
    ? {
        heroTitle: "Bienvenida de nuevo",
        heroDescription: "Inicia sesion para encontrar tus fotos, revisar eventos recientes y guardar tus favoritos.",
        bullets: ["Busqueda rapida por evento", "Acceso a tus galerias favoritas", "Historial de competencias"],
      }
    : isRecover
      ? {
          heroTitle: "Recupera tu acceso",
          heroDescription:
            "Te ayudamos a restablecer tu contrasena para que vuelvas a entrar a tus galerias en minutos.",
          bullets: ["Proceso rapido y seguro", "Recibirás un correo de verificacion", "Recupera tus favoritos"],
        }
      : isRecoverCode
        ? {
            heroTitle: "Confirma tu codigo",
            heroDescription:
              "Ingresa el codigo de recuperacion que enviamos a tu correo para continuar con el restablecimiento.",
            bullets: ["Codigo de 6 digitos", "Validez temporal por seguridad", "Paso previo para cambiar contrasena"],
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
            ) : isRecover || isRecoverCode ? (
              <>
                ¿Recordaste tu contraseña? <Link href="/login">Inicia sesión aquí</Link>
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
          {isLogin ? (
            <LoginForm />
          ) : isRecover ? (
            <RecoverForm />
          ) : isRecoverCode ? (
            <RecoverCodeForm />
          ) : (
            <RegisterForm />
          )}
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
          <Link href="/forgot-password">Olvidé mi contraseña</Link>
        </div>

        <button type="submit">Entrar</button>
      </form>
    </>
  );
}

function RecoverForm() {
  return (
    <>
      <h2>Recuperar contraseña</h2>
      <p className={styles.formNote}>
        Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      <form className={styles.form} action="/forgot-password/code" method="get">
        <label htmlFor="recoverEmail">Correo electronico</label>
        <input id="recoverEmail" name="email" type="email" placeholder="tu@email.com" required />

        <button type="submit">Continuar</button>
      </form>
    </>
  );
}

function RecoverCodeForm() {
  return (
    <>
      <h2>Código de recuperación</h2>
      <p className={styles.formNote}>Escribe el código de 6 dígitos que te enviamos al correo registrado.</p>

      <form className={styles.form}>
        <label htmlFor="recoverCode">Codigo</label>
        <input
          id="recoverCode"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="000000"
          required
        />

        <button type="submit">Validar codigo</button>
      </form>

      <p className={styles.inlineHelp}>
        ¿No te llegó? <Link href="/forgot-password">Reenviar código</Link>
      </p>
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
