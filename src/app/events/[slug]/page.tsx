import { EVENTS, getEventBySlug } from "@/data/events";
import styles from "./page.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import EventTeamsSearchClient from "../../../components/events/EventTeamsSearchClient";

type EventDetailsPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ day?: string; q?: string }>;
};

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export default async function EventDetailsPage({ params, searchParams }: EventDetailsPageProps) {
  const { slug } = await params;
  const { day, q } = await searchParams;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const selectedDayLabel = day ?? "Todos los dias";
  const initialQuery = (q ?? "").trim();

  return (
    <div className={styles.page}>
      <SiteHeader active={null} />
      <main className={styles.container}>
        <section className={styles.top}>
          <div className={styles.topHead}>
            <div>
              <Link href="/events" className={styles.backLink}>
                ← Volver a eventos
              </Link>
              <h1>{event.name}</h1>
            </div>

            <div className={styles.dayBadgeWrap}>
              <p className={styles.dayBadgeLabel}>Dia seleccionado</p>
              <p className={styles.dayBadgeValue}>{selectedDayLabel}</p>
            </div>
          </div>

          <div className={styles.metaRow}>
            <span>{event.city}</span>
            <span>{event.photos}</span>
            <span>{event.teams.length} equipos</span>
          </div>
        </section>

        <EventTeamsSearchClient eventSlug={event.slug} teams={event.teams} initialQuery={initialQuery} />
      </main>
    </div>
  );
}
