import Link from "next/link";
import styles from "./SiteHeader.module.css";

type NavKey = "inicio" | "eventos" | "trabajo" | "contacto";

type SiteHeaderProps = {
  active?: NavKey;
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
              <a href="#" className={`${styles.navLink} ${active === "contacto" ? styles.active : ""}`}>
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.searchBar}>
          <input type="text" placeholder="Buscar evento..." />
          <button type="button" aria-label="Buscar eventos">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 19L14.65 14.65"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
