import SiteHeader from "@/components/layout/SiteHeader";
import styles from "./page.module.css";
import { EVENTS } from "@/data/events";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className={styles.page}>
      <SiteHeader active="eventos" />

      <main className={styles.container}>
        <section className={styles.marketIntro}>
          <h1>Explora todos los eventos disponibles</h1>
          <p className={styles.label}>Escoge el evento en el que estás interesado</p>
          <p>
            Filtra por ciudad, revisa las galerias y entra al evento para encontrar tus fotos en segundos.
          </p>
          <div className={styles.filters}>
            <button className={styles.filterActive}>Todos</button>
            <button>Cheerleading</button>
            <button>Dance</button>
            <button>Nacionales</button>
            <button>Internacionales</button>
          </div>
        </section>

        <section className={styles.grid}>
          {EVENTS.map((event) => (
            <article className={styles.card} key={`${event.name}-${event.date}`}>
              <div className={styles.imageWrap}>
                <img src={event.image} alt={event.name} />
                <span className={styles.badge}>{event.date}</span>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.city}>{event.city}</p>
                <h2>{event.name}</h2>
                <div className={styles.cardFooter}>
                  <span>{event.photos}</span>
                  <Link href={`/events/${event.slug}`} className={styles.galleryLink}>
                    Ver galeria
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
