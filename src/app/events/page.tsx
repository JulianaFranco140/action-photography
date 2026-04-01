import SiteHeader from "@/components/layout/SiteHeader";
import styles from "./page.module.css";
import { EVENTS } from "@/data/events";
import Link from "next/link";

type EventStatus = "Proximo" | "Reciente" | "Finalizado";

const sportPalette = ["Cheerleading", "Dance", 'Pomps'];

function getSportByIndex(index: number) {
  return sportPalette[index % sportPalette.length];
}

function EventSection({
  title,
  subtitle,
  status,
  events,
  startIndex,
}: {
  title: string;
  subtitle: string;
  status: EventStatus;
  events: typeof EVENTS;
  startIndex: number;
}) {
  return (
    <section className={styles.sectionBlock}>
      <header className={styles.sectionHeader}>
        <h2>
          Eventos <span>{title}</span>
        </h2>
        <p>{subtitle}</p>
      </header>

      <div className={styles.grid}>
        {events.map((event, localIndex) => (
          <article className={styles.card} key={`${event.name}-${event.date}-${title}`}>
            <div className={styles.imageWrap}>
              <img src={event.image} alt={event.name} />
              <span className={styles.sportTag}>{getSportByIndex(startIndex + localIndex)}</span>
              <span
                className={`${styles.statusTag} ${
                  status === "Proximo"
                    ? styles.statusUpcoming
                    : status === "Reciente"
                      ? styles.statusRecent
                      : styles.statusPast
                }`}
              >
                {status}
              </span>
            </div>

            <div className={styles.cardBody}>
              <h3>{event.name}</h3>
              <ul className={styles.metaList}>
                <li>{event.date}</li>
                <li>{event.city}</li>
                <li>{event.teams.length} equipos</li>
              </ul>

              <Link href={`/events/${event.slug}`} className={styles.galleryLink}>
                Ver fotos
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function EventsPage() {
  const upcomingEvents = EVENTS.slice(0, 2);
  const recentEvents = EVENTS.slice(2, 4);
  const pastEvents = EVENTS.slice(4, 6);

  return (
    <div className={styles.page}>
      <SiteHeader active="eventos" />

      <main className={styles.container}>
        <section className={styles.marketIntro}>
          <h1>Explora todos los eventos disponibles</h1>
          <p>
            Separamos los eventos por estado para que encuentres rapido tus galerias sin mezclar competencias.
          </p>
        </section>

        <div className={styles.filtersRow}>
          <div className={styles.filters}>
            <button className={styles.filterActive}>Todos</button>
            <button>Cheerleading</button>
            <button>Dance</button>
            <button>Nacionales</button>
          </div>

          <div className={styles.searchBar}>
            <input type="text" placeholder="Buscar evento..." />
            <button type="button" aria-label="Buscar evento">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 19L14.65 14.65"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <EventSection
          title="próximos"
          subtitle="Descubre los eventos deportivos que se vienen"
          status="Proximo"
          events={upcomingEvents}
          startIndex={0}
        />

        <EventSection
          title="recientes"
          subtitle="Revive los mejores momentos de eventos recientes"
          status="Reciente"
          events={recentEvents}
          startIndex={3}
        />

        <EventSection
          title="pasados"
          subtitle="Explora el archivo de eventos anteriores"
          status="Finalizado"
          events={pastEvents}
          startIndex={6}
        />

      </main>
    </div>
  );
}
