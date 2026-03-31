export type EventTeam = {
  name: string;
  city: string;
  category: string;
  athletes: number;
};

export type EventItem = {
  slug: string;
  city: string;
  name: string;
  date: string;
  image: string;
  photos: string;
  teams: EventTeam[];
};

export const EVENTS: EventItem[] = [
  {
    slug: "world-of-dance-2025",
    city: "Medellin",
    name: "World of Dance 2025",
    date: "15 Jun 2025",
    image: "/event1.png",
    photos: "2,140 fotos",
    teams: [
      { name: "Action Storm", city: "Medellin", category: "Senior Elite", athletes: 22 },
      { name: "Diamond Flyers", city: "Bogota", category: "Junior Advanced", athletes: 18 },
      { name: "Skyline Crew", city: "Cali", category: "Open Hip Hop", athletes: 14 },
      { name: "Titans Spirit", city: "Pereira", category: "Senior Elite", athletes: 20 },
      { name: "Nova All Stars", city: "Bucaramanga", category: "Level 4", athletes: 16 },
    ],
  },
  {
    slug: "masters-super-cheer",
    city: "Cali",
    name: "Masters Super Cheer",
    date: "29 Jun 2025",
    image: "/event2.png",
    photos: "1,822 fotos",
    teams: [
      { name: "Phoenix Cheer", city: "Cali", category: "Senior Coed", athletes: 24 },
      { name: "Golden Vipers", city: "Manizales", category: "Junior Elite", athletes: 17 },
      { name: "Urban Rockets", city: "Bogota", category: "Pom Team", athletes: 15 },
      { name: "Legacy Squad", city: "Medellin", category: "Senior Coed", athletes: 21 },
      { name: "Twisters", city: "Armenia", category: "Level 3", athletes: 14 },
    ],
  },
  {
    slug: "cheer-celebrity-poitiers",
    city: "Cucuta",
    name: "Cheer Celebrity Poitiers",
    date: "08 Jul 2025",
    image: "/event3.png",
    photos: "2,009 fotos",
    teams: [
      { name: "Velocity Team", city: "Cucuta", category: "Senior Elite", athletes: 23 },
      { name: "Fierce Girls", city: "Barranquilla", category: "Junior Elite", athletes: 16 },
      { name: "Apex Motion", city: "Santa Marta", category: "Dance Team", athletes: 13 },
      { name: "Royal Dynamics", city: "Bogota", category: "Level 5", athletes: 19 },
      { name: "Impact Force", city: "Cali", category: "Senior Open", athletes: 18 },
    ],
  },
  {
    slug: "elite-nationals",
    city: "Bogota",
    name: "Elite Nationals",
    date: "20 Jul 2025",
    image: "/event1.png",
    photos: "1,566 fotos",
    teams: [
      { name: "Power District", city: "Bogota", category: "Senior Coed", athletes: 22 },
      { name: "Dream Flyers", city: "Medellin", category: "Level 4", athletes: 17 },
      { name: "Rhythm Up", city: "Ibague", category: "Dance Team", athletes: 15 },
      { name: "Stellar Crew", city: "Cucuta", category: "Junior Advanced", athletes: 16 },
      { name: "Spark Queens", city: "Cali", category: "Pom Team", athletes: 14 },
    ],
  },
  {
    slug: "summer-spirit-open",
    city: "Barranquilla",
    name: "Summer Spirit Open",
    date: "03 Ago 2025",
    image: "/event2.png",
    photos: "2,342 fotos",
    teams: [
      { name: "Caribbean Vibe", city: "Barranquilla", category: "Senior Open", athletes: 19 },
      { name: "North Stars", city: "Santa Marta", category: "Junior Elite", athletes: 16 },
      { name: "Pulse Crew", city: "Medellin", category: "Hip Hop", athletes: 14 },
      { name: "Sky Attack", city: "Valledupar", category: "Level 3", athletes: 15 },
      { name: "Blue Phoenix", city: "Bogota", category: "Senior Coed", athletes: 20 },
    ],
  },
  {
    slug: "power-stunt-festival",
    city: "Bucaramanga",
    name: "Power Stunt Festival",
    date: "16 Ago 2025",
    image: "/event3.png",
    photos: "1,438 fotos",
    teams: [
      { name: "Stunt Factory", city: "Bucaramanga", category: "Partner Stunt", athletes: 12 },
      { name: "Gravity Team", city: "Cali", category: "Level 4", athletes: 16 },
      { name: "Core Motion", city: "Medellin", category: "Senior Open", athletes: 18 },
      { name: "Thunder Squad", city: "Bogota", category: "Junior Advanced", athletes: 15 },
      { name: "Wild Tigers", city: "Cucuta", category: "Level 3", athletes: 14 },
    ],
  },
];

export function getEventBySlug(slug: string) {
  return EVENTS.find((event) => event.slug === slug);
}

export function slugifyText(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getTeamBySlug(eventSlug: string, teamSlug: string) {
  const event = getEventBySlug(eventSlug);
  if (!event) return undefined;

  const team = event.teams.find((item) => slugifyText(item.name) === teamSlug);
  if (!team) return undefined;

  return { event, team };
}
