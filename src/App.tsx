import AppRouter from './router/AppRouter';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
