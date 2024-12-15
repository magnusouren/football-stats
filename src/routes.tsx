import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Lazy-load sider
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Team = lazy(() => import('./pages/Team'));
const Settings = lazy(() => import('./pages/Settings'));
const Competition = lazy(() => import('./pages/Competition'));

// Definer ruter
const router = createBrowserRouter([
  {
    path: '/football-stats/',
    element: <Home />,
  },
  {
    path: '/football-stats/team/:teamId',
    element: <Team />,
  },
  {
    path: '/football-stats/competition/:competitionId',
    element: <Competition />,
  },
  {
    path: '/football-stats/settings',
    element: <Settings />,
  },
  {
    path: '/football-stats/about',
    element: <About />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
