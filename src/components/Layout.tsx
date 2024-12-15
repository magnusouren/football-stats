import React from 'react';
import { ModeToggle } from './ModeToggle';
import { useQuery } from '@tanstack/react-query';
import { fetchCompetitions } from '@/api/fetchCompetitions';
import { Competition } from '@/types';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data, error, isLoading } = useQuery<Competition[]>({
    queryKey: ['competitions'],
    queryFn: fetchCompetitions,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const [showMenu, setShowMenu] = React.useState(false);

  data?.sort((a, b) => {
    if (a.name === 'Premier League' || a.name === 'Champions League') return -1;
    if (b.name === 'Premier League' || b.name === 'Champions League') return 1;

    const value = a.name.localeCompare(b.name);

    return value;
  });

  // Placeholder content for sidebar while loading
  const renderSidebar = () => {
    if (isLoading) {
      return <div>Loading competitions...</div>;
    }

    if (error) {
      return <div>Error loading competitions: {error.message}</div>;
    }

    return (
      <div className="block md:flex lg:block gap-8 items-start">
        <div className="mb-4">
          <h2 className="mb-4 font-semibold">Leagues</h2>
          <ul className="space-y-2">
            {data?.map((competition) => {
              if (competition.name.split(' ').length > 2) {
                competition.name = competition.name
                  .split(' ')
                  .slice(-2, competition.name.split(' ').length)
                  .join(' ');
              }
              return (
                <li
                  key={competition.name}
                  className="hover:underline cursor-pointer text-sm"
                >
                  <a href={`/competition/${competition.code}`}>
                    {competition.name} ({competition.area.code})
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="mb-4 font-semibold">Favorite Teams (TODO)</h2>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer text-sm">
              Liverpool
            </li>
            <li className="hover:underline cursor-pointer text-sm">Chelsea</li>
            <li className="hover:underline cursor-pointer text-sm">Arsenal</li>
            <li className="hover:underline cursor-pointer text-sm">
              Manchester City
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-semibold">Other</h2>

          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer text-sm">
              <a href="/about">About</a>
            </li>
            <li className="hover:underline cursor-pointer text-sm">
              <a href="/settings">Settings</a>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b w-full flex justify-between p-2 pl-0 items-center">
        <div className="flex justify-start ml-2 md:ml-6">
          <button
            className="block lg:hidden"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <a href="/" className="flex items-center">
            <h1 className="font-bold text-2xl ml-1">F⚽︎⚽︎tball Stats</h1>
          </a>
        </div>
        <ModeToggle />
      </header>

      {/* Body: Nav and Main */}
      <div className="flex flex-1 h-full">
        {/* Sidebar */}
        <nav className="border-r w-1/6 p-4 ml-2 pt-4 hidden lg:block">
          {renderSidebar()}
        </nav>
        <nav
          className={`border-r w-screen p-4 pt-4 ${showMenu ? 'block' : 'hidden'} lg:hidden`}
        >
          {renderSidebar()}
        </nav>

        {/* Main content */}
        <main
          className={`flex-1 px-2 py-4 md:p-6 overflow-y-auto ${showMenu ? 'hidden lg:block' : 'lg:block'}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
