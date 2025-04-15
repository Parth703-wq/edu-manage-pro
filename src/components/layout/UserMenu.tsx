
import { useState } from 'react';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const userRole = user?.role || 'guest';
  const userName = user?.name || 'Guest User';

  return (
    <div className="relative ml-3">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 text-sm rounded-full focus:outline-none"
        >
          <div className="h-8 w-8 rounded-full bg-college-purple text-white flex items-center justify-center">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium text-gray-800">{userName}</div>
            <div className="text-xs text-gray-500 capitalize">{userRole}</div>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="px-4 py-2 border-b">
            <div className="text-sm font-medium text-gray-900">{userName}</div>
            <div className="text-xs text-gray-500 capitalize">{userRole}</div>
          </div>
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <User className="mr-3 h-4 w-4 text-gray-500" />
            Your Profile
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="mr-3 h-4 w-4 text-gray-500" />
            Settings
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="mr-3 h-4 w-4 text-gray-500" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
