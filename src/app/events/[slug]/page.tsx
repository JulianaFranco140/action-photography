import { EVENTS, getEventBySlug, slugifyText } from "@/data/events";
import styles from "./page.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";

type EventDetailsPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ day?: string }>;
};

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export default async function EventDetailsPage({ params, searchParams }: EventDetailsPageProps) {
  const { slug } = await params;
  const { day } = await searchParams;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const selectedDayLabel = day ? `Dia elegido: ${day}` : "Todos los dias";

  return (
    <div className={styles.page}>
      <SiteHeader active={null} />
      <main className={styles.container}>
        <section className={styles.top}>
            
          <Link href="/events" className={styles.backLink}>
            ← Volver a eventos
          </Link>
          <h1>{event.name}</h1>
          <p>
            {event.city} · {selectedDayLabel} · {event.photos}
          </p>
        </section>

        <section className={styles.listWrap}>
          <ul className={styles.teamList}>
            {event.teams.map((team) => (
              <li className={styles.teamRow} key={team.name}>
                <div className={styles.mainInfo}>
                  <p className={styles.teamName}>{team.name}</p>
                  <p className={styles.teamMeta}>
                    {team.city} · {team.category}
                  </p>
                </div>
                <Link
                  href={`/events/${event.slug}/team/${slugifyText(team.name)}`}
                  className={styles.actionButton}
                  aria-label={`Ver equipo ${team.name}`}
                >
                  →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
