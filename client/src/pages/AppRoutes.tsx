import { Routes, Route, Navigate } from 'react-router-dom';
import Register from '@/features/auth/pages/Register';
import Login from '@/features/auth/pages/Login';
import Profile from '@/features/auth/pages/Profile';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/features/dashboard/Dashboard';
import Landing from './Landing';
import ImageUpload from './ImageUpload';
import PrivateRoute from '@/components/PrivateRoute';
import { isAuthenticated } from '@/utils/auth';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
      <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
      <Route path="/upload" element={<PrivateRoute><ImageUpload /></PrivateRoute>} />
    </Routes>
  );
};

export default AppRoutes;
