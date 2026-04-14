import styles from "./page.module.css";
import SiteHeader from "@/components/layout/SiteHeader";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <SiteHeader active="inicio" />

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1>REVIVE LA EMOCIÓN</h1>
            <p>
              Encuentra las mejores fotos de tu equipo de cheerleading. Momentos únicos capturados por profesionales.
            </p>
            <Link className={styles.ctaButton} href="/events">
              Ver todos los Eventos
            </Link>
          </div>
          <div className={styles.heroImages}>
            <img src="/cheer2.png" className={`${styles.photo} ${styles.photoLeft}`} alt="Cheerleading" />
            <img src="/cheer1.png" className={`${styles.photo} ${styles.photoRight}`} alt="Cheerleading" />
            <img src="/cheer3.png" className={`${styles.photo} ${styles.photoCenter}`} alt="Cheerleading" />

            <img src="/Action Personaje.svg" className={styles.mascot} alt="Mascota Action" />
          </div>
        </div>
      </section>

      <section className={styles.recentEvents}>
        <div className={styles.container}>
          <h2>
            Eventos <span className={styles.italic}>recientes</span>
          </h2>

          <div className={styles.eventsWrapper}>
            <div className={styles.eventCard}>
              <div className={`${styles.eventImage} ${styles.event1}`}>
                <img src="/event1.png" alt="World of Dance 2025" />
              </div>
              <div className={styles.eventInfo}>
                <p className={styles.eventLocation}>Medellín,</p>
                <p className={styles.eventName}>World of Dance 2025</p>
              </div>
            </div>

            <div className={styles.eventCard}>
              <div className={`${styles.eventImage} ${styles.event2}`}>
                <img src="/event2.png" alt="Masters Super Cheer" />
              </div>
              <div className={styles.eventInfo}>
                <p className={styles.eventLocation}>Cali,</p>
                <p className={styles.eventName}>Masters Super Cheer</p>
              </div>
            </div>

            <div className={styles.eventCard}>
              <div className={`${styles.eventImage} ${styles.event3}`}>
                <img src="/event3.png" alt="Cheer Celebrity Poitiers" />
              </div>
              <div className={styles.eventInfo}>
                <p className={styles.eventLocation}>Cúcuta,</p>
                <p className={styles.eventName}>Cheer Celebrity Poitiers</p>
              </div>
            </div>

            <div className={styles.exploreCard}>
              <p>Sigue explorando más eventos</p>
              <button className={styles.arrowButton}>→</button>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerLogo}>
            <img src="/Action A Blanco.svg" alt="Action Photography A" />
          </div>
          <p className={styles.copyright}>© 2025 Action Photography. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
