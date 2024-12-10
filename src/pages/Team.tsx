import { useParams } from 'react-router-dom';

export default function Team() {
  const { teamId } = useParams<{ teamId: string }>();
  return (
    <div>
      <h1 className="text-2xl font-bold">Team {teamId}</h1>
    </div>
  );
}
