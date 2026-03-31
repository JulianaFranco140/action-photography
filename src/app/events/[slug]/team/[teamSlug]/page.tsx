import { EVENTS, getTeamBySlug, slugifyText } from "@/data/events";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

type TeamPhotosPageProps = {
  params: Promise<{ slug: string; teamSlug: string }>;
};

const PHOTO_POOL = [
  "/ACT_4598.JPG",
  "/ACT_4599.JPG",
  "/ACT_4600.JPG",
  "/ACT_4601.JPG",
  "/ACT_4602.JPG",
  "/ACT_4603.JPG",
  "/ACT_4604.JPG",
  "/ACT_4605.JPG",
  "/ACT_4606.JPG",
  "/ACT_4607.JPG",
  "/ACT_4608.JPG",
  "/ACT_4609.JPG",
];

export function generateStaticParams() {
  return EVENTS.flatMap((event) =>
    event.teams.map((team) => ({
      slug: event.slug,
      teamSlug: slugifyText(team.name),
    })),
  );
}

export default async function TeamPhotosPage({ params }: TeamPhotosPageProps) {
  const { slug, teamSlug } = await params;
  const result = getTeamBySlug(slug, teamSlug);

  if (!result) {
    notFound();
  }

  const { event, team } = result;
  const photos = Array.from({ length: 12 }).map((_, index) => ({
    id: `${teamSlug}-${index + 1}`,
    src: PHOTO_POOL[index % PHOTO_POOL.length],
    title: `${team.name} · Foto ${index + 1}`,
    price: `${(29000 + index * 4000).toLocaleString("es-CO")} COP`,
  }));

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <section className={styles.topBar}>
          <div>
            <Link href={`/events/${event.slug}`} className={styles.backLink}>
              ← Volver a equipos
            </Link>
            <h1>{team.name}</h1>
            <p>
              {event.name} · {team.city} · {team.category}
            </p>
          </div>

          <button type="button" className={styles.cartButton} aria-label="Abrir carrito de compras">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 4H5L7.2 14.4C7.29 14.84 7.53 15.23 7.89 15.5C8.25 15.77 8.7 15.9 9.15 15.86H17.72C18.17 15.86 18.61 15.71 18.96 15.43C19.31 15.15 19.54 14.76 19.61 14.31L21 7H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M9 20C9.55228 20 10 19.5523 10 19C10 18.4477 9.55228 18 9 18C8.44772 18 8 18.4477 8 19C8 19.5523 8.44772 20 9 20Z" fill="currentColor" />
              <path
                d="M18 20C18.5523 20 19 19.5523 19 19C19 18.4477 18.5523 18 18 18C17.4477 18 17 18.4477 17 19C17 19.5523 17.4477 20 18 20Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </section>

        <section className={styles.grid}>
          {photos.map((photo) => (
            <article className={styles.card} key={photo.id}>
              <img src={photo.src} alt={photo.title} />
              <div className={styles.cardBody}>
                <h2>{photo.title}</h2>
                <div className={styles.cardFooter}>
                  <span>{photo.price}</span>
                  <button type="button">Agregar</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
