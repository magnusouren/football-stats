import Layout from './components/Layout';
import { ThemeProvider } from './components/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes';
import { TooltipProvider } from './components/ui/tooltip';

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="min-h-screen min-w-full">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <Layout>
              <AppRoutes />
            </Layout>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}
