"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { slugifyText, type EventTeam } from "@/data/events";
import styles from "@/app/events/[slug]/page.module.css";

type EventTeamsSearchClientProps = {
  eventSlug: string;
  teams: EventTeam[];
  initialQuery?: string;
};

export default function EventTeamsSearchClient({
  eventSlug,
  teams,
  initialQuery = "",
}: EventTeamsSearchClientProps) {
  const [query, setQuery] = useState(initialQuery);

  const filteredTeams = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return teams;

    return teams.filter((team) => {
      const haystack = `${team.name} ${team.city} ${team.category}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query, teams]);

  return (
    <section className={styles.listWrap}>
      <div className={styles.searchForm}>
        <input
          type="search"
          placeholder="Buscar equipo por nombre, ciudad o categoria"
          aria-label="Buscar equipo"
          className={styles.searchInput}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query ? (
          <button type="button" className={styles.clearSearch} onClick={() => setQuery("")}>
            Limpiar
          </button>
        ) : null}
      </div>

      <p className={styles.searchCount}>{filteredTeams.length} resultados</p>

      {filteredTeams.length ? (
        <ul className={styles.teamList}>
          {filteredTeams.map((team) => (
            <li className={styles.teamRow} key={team.name}>
              <div className={styles.mainInfo}>
                <p className={styles.teamName}>{team.name}</p>
                <div className={styles.teamMetaRow}>
                  <span>{team.city}</span>
                  <span>{team.category}</span>
                </div>
              </div>
              <Link
                href={`/events/${eventSlug}/team/${slugifyText(team.name)}`}
                className={styles.actionButton}
                aria-label={`Ver equipo ${team.name}`}
              >
                Ver fotos
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyState}>No encontramos equipos para "{query}". Prueba con otro termino.</div>
      )}
    </section>
  );
}
