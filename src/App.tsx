import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StudentDetails from './pages/StudentDetails';
import Login from './pages/Login';
import AddStudent from './pages/AddStudent';
import NotFound from './pages/NotFound';
import Loading from './components/ui/Loading';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route 
              path="students/:id" 
              element={
                <ProtectedRoute>
                  <StudentDetails />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="add-student" 
              element={
                <ProtectedRoute>
                  <AddStudent />
                </ProtectedRoute>
              } 
            />
            {/* nothing */}
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;