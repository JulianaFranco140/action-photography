"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import styles from "./page.module.css";
import { EVENTS, type EventItem } from "@/data/events";

type EventStatus = "Proximo" | "Reciente" | "Finalizado";

const sportPalette = ["Cheerleading", "Dance", "Pomps"];

function getSportByIndex(index: number) {
  return sportPalette[index % sportPalette.length];
}

function getDateRangeLabel(event: EventItem) {
  if (!event.days.length) return event.date;
  if (event.days.length === 1) return event.days[0];
  return `${event.days[0]} al ${event.days[event.days.length - 1]}`;
}

function EventSection({
  title,
  subtitle,
  status,
  events,
  startIndex,
  onOpenModal,
}: {
  title: string;
  subtitle: string;
  status: EventStatus;
  events: EventItem[];
  startIndex: number;
  onOpenModal: (event: EventItem) => void;
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
            <div className={`${styles.imageWrap} ${status === "Proximo" ? styles.imageUpcoming : ""}`}>
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
                <li>{getDateRangeLabel(event)}</li>
                <li>{event.city}</li>
                <li>{event.teams.length} equipos</li>
              </ul>

              {status !== "Proximo" ? (
                <button type="button" className={styles.galleryLink} onClick={() => onOpenModal(event)}>
                  Ver fotos
                </button>
              ) : (
                <p className={styles.upcomingHint}>Disponible cuando empiece el evento</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function EventsPage() {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedDay, setSelectedDay] = useState("");

  const upcomingEvents = useMemo(() => EVENTS.slice(0, 2), []);
  const recentEvents = useMemo(() => EVENTS.slice(2, 4), []);
  const pastEvents = useMemo(() => EVENTS.slice(4, 6), []);

  const goToEvent = (event: EventItem, day?: string) => {
    if (!day) {
      router.push(`/events/${event.slug}`);
      return;
    }

    router.push(`/events/${event.slug}?day=${encodeURIComponent(day)}`);
  };

  const openDateModal = (event: EventItem) => {
    setSelectedEvent(event);
    setSelectedDay(event.days[0] ?? "");
  };

  const getDaysGridColumns = (totalDays: number) => {
    if (totalDays <= 1) return 1;
    if (totalDays <= 3) return totalDays;
    return 2;
  };

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
          title="recientes"
          subtitle="Revive los mejores momentos de eventos recientes"
          status="Reciente"
          events={recentEvents}
          startIndex={3}
          onOpenModal={openDateModal}
        />

        <EventSection
          title="próximos"
          subtitle="Descubre los eventos deportivos que se vienen"
          status="Proximo"
          events={upcomingEvents}
          startIndex={0}
          onOpenModal={openDateModal}
        />

        <EventSection
          title="pasados"
          subtitle="Explora el archivo de eventos anteriores"
          status="Finalizado"
          events={pastEvents}
          startIndex={6}
          onOpenModal={openDateModal}
        />
      </main>

      <div
        className={`${styles.dateModalOverlay} ${selectedEvent ? styles.dateModalOverlayVisible : ""}`}
        onClick={() => {
          setSelectedEvent(null);
          setSelectedDay("");
        }}
      />

      <section className={`${styles.dateModal} ${selectedEvent ? styles.dateModalOpen : ""}`}>
        {selectedEvent ? (
          <>
            <div className={styles.dateModalHeader}>
              <h3>{selectedEvent.name}</h3>
              <button
                type="button"
                onClick={() => {
                  setSelectedEvent(null);
                  setSelectedDay("");
                }}
                aria-label="Cerrar selector de fecha"
              >
                x
              </button>
            </div>

            <p className={styles.dateModalText}>Selecciona el dia que deseas ver o entra a la galeria completa.</p>

            <div
              className={styles.dayButtons}
              style={{ gridTemplateColumns: `repeat(${getDaysGridColumns(selectedEvent.days.length)}, minmax(0, 1fr))` }}
            >
              {selectedEvent.days.map((day) => (
                <button
                  key={day}
                  type="button"
                  className={`${styles.dayButton} ${selectedDay === day ? styles.dayButtonActive : ""}`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.viewDayButton}
                onClick={() => selectedDay && goToEvent(selectedEvent, selectedDay)}
                disabled={!selectedDay}
              >
                Ver dia seleccionado
              </button>

              <button type="button" className={styles.viewAllButton} onClick={() => goToEvent(selectedEvent)}>
                Ver todos los dias
              </button>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
