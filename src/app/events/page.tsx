import SiteHeader from "@/components/layout/SiteHeader";
import styles from "./page.module.css";
import { EVENTS } from "@/data/events";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className={styles.page}>
      <SiteHeader active="eventos" userName="Cliente Action" />

      <main className={styles.container}>
        <section className={styles.marketIntro}>
          <h1>Explora todos los eventos disponibles</h1>
          <p className={styles.label}>Escoge el evento en el que estás interesado</p>
          <p>
            Filtra por ciudad, revisa las galerias y entra al evento para encontrar tus fotos en segundos.
          </p>
          <div className={styles.filtersRow}>
            <div className={styles.filters}>
              <button className={styles.filterActive}>Todos</button>
              <button>Cheerleading</button>
              <button>Dance</button>
              <button>Nacionales</button>
              <button>Internacionales</button>
            </div>

            <div className={styles.searchBar}>
              <input type="text" placeholder="Buscar evento..." />
              <button type="button" aria-label="Buscar evento">
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
