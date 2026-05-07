import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Bookmark, LogIn, UserPlus, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={closeMenu} className="text-xl font-bold text-blue-600 shrink-0">
              ScrapingHub
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link
                  to="/bookmarks"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  <Bookmark size={18} />
                  <span>Bookmarks</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors font-medium cursor-pointer"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {user ? (
              <>
                <Link
                  to="/bookmarks"
                  onClick={closeMenu}
                  className="flex items-center space-x-3 text-gray-700 hover:bg-gray-50 p-3 rounded-xl transition-colors"
                >
                  <Bookmark size={20} />
                  <span className="font-medium">Bookmarks</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="flex items-center space-x-3 w-full text-left text-red-600 hover:bg-red-50 p-3 rounded-xl transition-colors"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center space-x-3 text-gray-700 hover:bg-gray-50 p-3 rounded-xl transition-colors"
                >
                  <LogIn size={20} />
                  <span className="font-medium">Login</span>
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="flex items-center space-x-3 bg-blue-600 text-white p-3 rounded-xl transition-colors"
                >
                  <UserPlus size={20} />
                  <span className="font-medium">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
