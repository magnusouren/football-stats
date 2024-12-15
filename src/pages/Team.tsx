import { fetchTeam } from '@/api/fetchTeam';
import { DetailedTeam } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export default function Team() {
  const { teamId } = useParams<{ teamId: string }>();

  const { data, error, isLoading } = useQuery<DetailedTeam | null>({
    queryKey: ['team', teamId],
    queryFn: () => {
      if (!teamId) return null;
      return fetchTeam(teamId);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 font-semibold text-center mt-10">
        Error: {error.message}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-gray-500 font-medium text-center mt-10">
        No data found.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="w-full mb-8 block sm:hidden ">
        <img src={data.crest} alt={data.name} className="m-auto" />
      </div>
      <Card className="mb-6 shadow-lg h-full flex items-center justify-evenly md:justify-between flex-col sm:flex-row ">
        <div className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{data.name}</CardTitle>
            <CardDescription className="text-sm">{data.venue}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center space-x-6">
              <div>
                <p>
                  <span className="font-medium">Founded:</span> {data.founded}
                </p>
                <p>
                  <span className="font-medium">Club Colors:</span>{' '}
                  {data.clubColors}
                </p>

                <p>
                  <span className="font-medium">Address:</span> {data.address}
                </p>
                <p>
                  <span className="font-medium">Short Name:</span>{' '}
                  {data.shortName}
                </p>
                <p>
                  <span className="font-medium">Abbreviation:</span> {data.tla}
                </p>
                <p>
                  <span className="font-medium">Website:</span>{' '}
                  <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    {data.website.replace(/(^\w+:|^)\/\//, '')}
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </div>
        <div className="lg:mr-8 w-full mb-4 hidden sm:block">
          <img src={data.crest} alt={data.name} className="m-auto sm:mr-0" />
        </div>
      </Card>

      <Accordion type="single" collapsible>
        <AccordionItem value="coach">
          <AccordionTrigger className="font-medium hover:text-blue-600">
            Coach Information
          </AccordionTrigger>
          <AccordionContent>
            <p>
              <strong>Name:</strong> {data.coach.name}
            </p>
            <p>
              <strong>Nationality:</strong> {data.coach.nationality}
            </p>
            <p>
              <strong>Contract:</strong> {data.coach.contract.start} -{' '}
              {data.coach.contract.until}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="squad">
          <AccordionTrigger className="font-medium hover:text-blue-600">
            Squad
          </AccordionTrigger>
          <AccordionContent>
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Nationality</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.squad.map((player) => (
                  <TableRow
                    key={player.id}
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.nationality}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="competitions">
          <AccordionTrigger className="font-medium hover:text-blue-600">
            Running Competitions
          </AccordionTrigger>
          {data.runningCompetitions.map((competition) => (
            <AccordionContent key={competition.id}>
              <a
                href={`/competition/${competition.id}`}
                className="hover:underline flex items-center gap-4 hover:text-blue-500 transition-colors"
              >
                <img
                  src={competition.emblem}
                  alt={competition.name}
                  className="w-12 h-12 rounded-full shadow p-2"
                />
                <span className="font-medium">{competition.name}</span>
              </a>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
