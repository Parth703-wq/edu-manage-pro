
import { Bell, Search, Menu } from 'lucide-react';
import { useState } from 'react';
import UserMenu from './UserMenu';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar = ({ sidebarOpen, setSidebarOpen }: NavbarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-600 hover:text-college-purple focus:outline-none md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
            <div className={`${searchOpen ? 'block' : 'hidden'} md:block ml-4`}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-college-purple focus:ring-college-purple sm:text-sm"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </div>
            <button
              type="button"
              className="ml-2 md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              className="p-1 rounded-full text-gray-600 hover:text-college-purple focus:outline-none"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
