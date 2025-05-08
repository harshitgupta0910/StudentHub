import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../services/firebase';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">StudentHub</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            
            {currentUser ? (
              <>
                <Link to="/add-student" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                  Add Student
                </Link>
                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-sm text-gray-600">{currentUser.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="p-1 rounded-full text-gray-500 hover:text-red-500 hover:bg-gray-100 transition-colors"
                    aria-label="Sign out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md py-2 px-4 animate-fadeIn">
          <Link 
            to="/" 
            className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          
          {currentUser ? (
            <>
              <Link 
                to="/add-student" 
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Add Student
              </Link>
              <div className="py-2 flex flex-col">
                <span className="text-sm text-gray-600">{currentUser.email}</span>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-1 py-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center space-x-1 py-2 text-blue-600 hover:text-blue-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;