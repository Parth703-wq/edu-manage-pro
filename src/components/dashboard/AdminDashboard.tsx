
import { Users, GraduationCap, BookOpen, Bell, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import RecentActivity from './RecentActivity';
import QuickStats from './QuickStats';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,254',
      icon: <Users className="h-6 w-6" />,
      change: '+5%',
      color: 'border-college-accent-blue'
    },
    {
      title: 'Faculty Members',
      value: '87',
      icon: <GraduationCap className="h-6 w-6" />,
      change: '+2%',
      color: 'border-college-accent-green'
    },
    {
      title: 'Active Courses',
      value: '46',
      icon: <BookOpen className="h-6 w-6" />,
      change: '+0%',
      color: 'border-college-accent-orange'
    },
    {
      title: 'Announcements',
      value: '12',
      icon: <Bell className="h-6 w-6" />,
      change: '+3',
      color: 'border-college-accent-red'
    }
  ];

  const activities = [
    {
      id: 1,
      user: 'John Smith',
      action: 'added new student',
      target: 'Emma Johnson',
      time: '2 hours ago'
    },
    {
      id: 2,
      user: 'Sarah Parker',
      action: 'updated course',
      target: 'Advanced Mathematics',
      time: '3 hours ago'
    },
    {
      id: 3,
      user: 'Admin',
      action: 'published announcement',
      target: 'Campus Maintenance Schedule',
      time: '5 hours ago'
    },
    {
      id: 4,
      user: 'Mike Wilson',
      action: 'approved leave request for',
      target: 'Prof. Anderson',
      time: 'Yesterday'
    },
    {
      id: 5,
      user: 'System',
      action: 'generated monthly report for',
      target: 'Department of Computer Science',
      time: 'Yesterday'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Faculty Meeting',
      date: 'Today, 2:00 PM',
      location: 'Conference Room A'
    },
    {
      id: 2,
      title: 'Board Review',
      date: 'Tomorrow, 10:00 AM',
      location: 'Administrative Building'
    },
    {
      id: 3,
      title: 'Semester Planning',
      date: 'Jul 18, 9:00 AM',
      location: 'Dean\'s Office'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <QuickStats key={index} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="dashboard-card">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <RecentActivity activities={activities} />
          </Card>
        </div>
        
        <div>
          <Card className="dashboard-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
              <Calendar className="h-5 w-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="border-l-4 border-college-purple pl-3 py-1">
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
