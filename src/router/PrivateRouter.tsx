import { Navigate, Outlet } from 'react-router';

const PrivateRouter = () => {
  return true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
