import SiteHeader from "@/components/layout/SiteHeader";
import styles from "./page.module.css";

const events = [
  {
    city: "Medellin",
    name: "World of Dance 2025",
    date: "15 Jun 2025",
    image: "/event1.png",
    photos: "2,140 fotos",
  },
  {
    city: "Cali",
    name: "Masters Super Cheer",
    date: "29 Jun 2025",
    image: "/event2.png",
    photos: "1,822 fotos",
  },
  {
    city: "Cucuta",
    name: "Cheer Celebrity Poitiers",
    date: "08 Jul 2025",
    image: "/event3.png",
    photos: "2,009 fotos",
  },
  {
    city: "Bogota",
    name: "Elite Nationals",
    date: "20 Jul 2025",
    image: "/event1.png",
    photos: "1,566 fotos",
  },
  {
    city: "Barranquilla",
    name: "Summer Spirit Open",
    date: "03 Ago 2025",
    image: "/event2.png",
    photos: "2,342 fotos",
  },
  {
    city: "Bucaramanga",
    name: "Power Stunt Festival",
    date: "16 Ago 2025",
    image: "/event3.png",
    photos: "1,438 fotos",
  },
];

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
          {events.map((event) => (
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
                  <button type="button">Ver galeria</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
