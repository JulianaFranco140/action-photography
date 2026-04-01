import { EVENTS, getEventBySlug, slugifyText } from "@/data/events";
import styles from "./page.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <section className={styles.top}>
          <Link href="/events" className={styles.backLink}>
            ← Volver a eventos
          </Link>
          <h1>{event.name}</h1>
          <p>
            {event.city} · {day ?? event.date} · {event.photos}
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
