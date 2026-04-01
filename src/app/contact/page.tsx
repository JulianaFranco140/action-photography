import SiteHeader from "@/components/layout/SiteHeader";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <SiteHeader active="contacto" userName="Cliente Action" />

      <main className={styles.container}>
        <section className={styles.hero}>
          <figure className={styles.mascotWrap}>
            <img className={styles.mascot} src="/Action Personaje.svg" alt="Mascota Action" />
          </figure>

          <div className={styles.heroContent}>
            <div className={styles.speechBubble}>
              <p className={styles.badge}>Action Photography</p>
              <h1>Hablemos</h1>
              <p className={styles.subtitle}>
                La mascota de Action te invita a contactarnos. Estamos listos para ayudarte con tus
                eventos, pedidos y soporte.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.channelsSection}>
          <article className={styles.contactCard}>
            <p className={styles.areaLabel}>Área comercial</p>
            <a className={styles.mainLink} href="https://wa.me/573134234069" target="_blank" rel="noopener noreferrer">
              +57 313 423 40 69
            </a>
            <p className={styles.cardHint}>Cotizaciones, eventos y alianzas.</p>
          </article>

          <article className={styles.contactCard}>
            <p className={styles.areaLabel}>Área administrativa</p>
            <a className={styles.mainLink} href="https://wa.me/573215237656" target="_blank" rel="noopener noreferrer">
              +57 321 523 76 56
            </a>
            <p className={styles.cardHint}>Facturación, soporte y seguimiento.</p>
          </article>

          <article className={styles.contactCard}>
            <p className={styles.areaLabel}>Instagram</p>
            <a
              className={styles.mainLink}
              href="https://www.instagram.com/actionph.col/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
            >
              @actionph.col
            </a>
            <p className={styles.cardHint}>Novedades, historias y lanzamientos de galerias.</p>
          </article>
        </section>
      </main>
    </div>
  );
}
