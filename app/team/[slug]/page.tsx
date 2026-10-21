import { TEAM_SLUGS } from '../../components/v2/copy';
import { TeamMemberV2 } from '../../components/v2/TeamPage';

// One page per founder.
export function generateStaticParams() {
  return Object.keys(TEAM_SLUGS).map((slug) => ({ slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <TeamMemberV2 slug={params.slug} />;
}
