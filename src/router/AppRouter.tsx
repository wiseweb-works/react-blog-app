import { BrowserRouter, Route, Routes } from 'react-router';
import PrivateRouter from './PrivateRouter';
import {
  About,
  Blogs,
  Dashboard,
  Details,
  Login,
  NewBlog,
  NotFound,
  Profile,
  Register,
} from '../pages';
import { Footer, Navbar } from '../components';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/newblog" element={<NewBlog />} />
          <Route path="/blogs/:id" element={<Details />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
