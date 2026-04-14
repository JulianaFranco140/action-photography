import Link from "next/link";
import styles from "./SiteHeader.module.css";

type NavKey = "inicio" | "eventos" | "trabajo" | "contacto";

type SiteHeaderProps = {
  active?: NavKey | null;
};

export default function SiteHeader({ active = "inicio" }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" aria-label="Ir al inicio">
            <img src="/Logo Action Blanco.svg" alt="Action Photography" />
          </Link>
        </div>

        <nav className={styles.navbar}>
          <ul>
            <li>
              <Link href="/" className={`${styles.navLink} ${active === "inicio" ? styles.active : ""}`}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/events" className={`${styles.navLink} ${active === "eventos" ? styles.active : ""}`}>
                Eventos
              </Link>
            </li>
            <li>
              <a href="#" className={`${styles.navLink} ${active === "trabajo" ? styles.active : ""}`}>
                Nuestro Trabajo
              </a>
            </li>
            <li>
              <Link href="/contact" className={`${styles.navLink} ${active === "contacto" ? styles.active : ""}`}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.rightControls}>
          <div className={styles.authActions}>
            <Link href="/login" className={styles.loginButton}>
              Iniciar sesión
            </Link>
            <Link href="/register" className={styles.registerButton}>
              Registrarme
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
