import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/pages/AppRoutes';
import Navbar from '@/components/Navbar';
import { AuthProvider } from "@/context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
