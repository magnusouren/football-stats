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
      <div>
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
        <h2 className="mb-4 font-semibold my-4">Favorite Teams</h2>
        <ul className="space-y-2">
          <li className="hover:underline cursor-pointer text-sm">Liverpool</li>
          <li className="hover:underline cursor-pointer text-sm">Chelsea</li>
          <li className="hover:underline cursor-pointer text-sm">Arsenal</li>
          <li className="hover:underline cursor-pointer text-sm">
            Manchester City
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b w-full flex justify-between p-2 items-center">
        <div className="flex gap-2 w-full">
          <h1 className="self-center font-bold text-lg ml-4 w-1/6">
            <a href="/" className="hover:underline">
              Football Stats
            </a>
          </h1>
          <a href="/" className="hover:underline self-center text-sm">
            Home
          </a>
          <p className="self-center">-</p>
          <a href="/settings" className="hover:underline self-center text-sm">
            Settings
          </a>
          <p className="self-center">-</p>
          <a href="/about" className="hover:underline self-center text-sm">
            About
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

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
