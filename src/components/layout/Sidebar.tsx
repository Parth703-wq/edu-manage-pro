
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, GraduationCap, BookOpen, 
  Clock, ClipboardCheck, Award, DollarSign, 
  Bell, MessageSquare, ChevronDown, X, Menu
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  
  const role = user?.role || 'guest';
  
  // Menu items based on user role
  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/',
      allowedRoles: ['admin', 'faculty', 'student']
    },
    { 
      name: 'Students', 
      icon: Users, 
      path: '/students',
      allowedRoles: ['admin', 'faculty']
    },
    { 
      name: 'Faculty', 
      icon: GraduationCap, 
      path: '/faculty',
      allowedRoles: ['admin']
    },
    { 
      name: 'Courses', 
      icon: BookOpen, 
      path: '/courses',
      allowedRoles: ['admin', 'faculty', 'student']
    },
    { 
      name: 'Timetable', 
      icon: Clock, 
      path: '/timetable',
      allowedRoles: ['admin', 'faculty', 'student']
    },
    { 
      name: 'Attendance', 
      icon: ClipboardCheck, 
      path: '/attendance',
      allowedRoles: ['admin', 'faculty', 'student']
    },
    { 
      name: 'Examinations', 
      icon: Award, 
      path: '/examinations',
      allowedRoles: ['admin', 'faculty', 'student']
    },
    { 
      name: 'Fees', 
      icon: DollarSign, 
      path: '/fees',
      allowedRoles: ['admin', 'student']
    },
    { 
      name: 'Announcements', 
      icon: Bell, 
      path: '/announcements',
      allowedRoles: ['admin', 'faculty', 'student']
    },
    { 
      name: 'Messages', 
      icon: MessageSquare, 
      path: '/messages',
      allowedRoles: ['admin', 'faculty', 'student']
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    item.allowedRoles.includes(role)
  );

  // Effect to close sidebar when route changes on mobile
  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [location.pathname]);

  // Handle menu expansion
  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-sidebar transition-transform duration-300 ease-in-out transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="h-full flex flex-col">
          {/* Logo and close button */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-college-purple" />
              </div>
              <span className="ml-2 font-bold text-lg text-white">GECBHaruch</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden text-gray-300 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu items */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {filteredMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center py-2 px-3 text-base font-medium rounded-md ${
                    location.pathname === item.path
                      ? 'bg-sidebar-accent text-white'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* User info */}
          <div className="px-3 py-4 border-t border-sidebar-border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-white text-college-purple flex items-center justify-center">
                  {user?.name?.charAt(0).toUpperCase() || 'G'}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-white">{user?.name || 'Guest User'}</div>
                <div className="text-xs text-gray-300 capitalize">{user?.role || 'guest'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
