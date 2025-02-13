import { BrowserRouter, Route, Routes } from 'react-router';
import PrivateRouter from './PrivateRouter';
import { Dashboard, Details, Login, NotFound, Register } from '../pages';
import { Footer, Navbar } from '../components';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRouter />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blogs/:id" element={<Details />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
