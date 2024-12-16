import { TodaysMatches } from '@/components/TodaysMatches';

export default function Home() {
  return (
    <div className="w-full">
      <h1 className=" font-bold text-2xl mb-12">F⚽︎⚽︎tball Stats</h1>

      <p className="">
        This is a simple Football Stats app as a hobby-project to visualize some
        data. All data is fetched from{' '}
        <a
          href="https://www.football-data.org/"
          className="hover:underline text-blue-500"
          target="_blank"
        >
          https://www.football-data.org/
        </a>{' '}
        (👏) and displayed here. If you want to read more about the project,
        please visit the{' '}
        <a href="/about" className="hover:underline text-blue-500">
          about
        </a>{' '}
        page.
      </p>

      <TodaysMatches />
    </div>
  );
}
