import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AddCardModal } from './components/AddCardModal';
import { CardList } from './components/CardList';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Loyalty Wallet
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Hello, {user?.username}</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full font-bold hover:opacity-80 transition-opacity"
          >
            <Plus size={20} />
            Add Card
          </button>
          <button onClick={logout} className="text-sm text-red-500 hover:text-red-700 font-semibold">Logout</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <CardList onAddCard={() => setIsModalOpen(true)} />
      </main>

      <AddCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
