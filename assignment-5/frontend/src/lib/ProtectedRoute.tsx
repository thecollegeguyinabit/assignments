
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../store/index.ts';

const ProtectedRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth)
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default ProtectedRoute;