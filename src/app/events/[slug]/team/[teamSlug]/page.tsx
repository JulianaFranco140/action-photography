import { EVENTS, getTeamBySlug, slugifyText } from "@/data/events";
import { notFound } from "next/navigation";
import TeamGalleryClient from "@/components/events/TeamGalleryClient";

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
    price: 29000 + index * 4000,
  }));

  return <TeamGalleryClient event={event} team={team} photos={photos} />;
}
