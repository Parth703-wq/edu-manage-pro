
import { ClipboardCheck, Users, BookOpen, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import RecentActivity from './RecentActivity';
import QuickStats from './QuickStats';

const FacultyDashboard = () => {
  const stats = [
    {
      title: 'My Courses',
      value: '5',
      icon: <BookOpen className="h-6 w-6" />,
      change: '',
      color: 'border-college-accent-blue'
    },
    {
      title: 'Total Students',
      value: '187',
      icon: <Users className="h-6 w-6" />,
      change: '',
      color: 'border-college-accent-green'
    },
    {
      title: 'Pending Tasks',
      value: '8',
      icon: <ClipboardCheck className="h-6 w-6" />,
      change: '+2',
      color: 'border-college-accent-orange'
    },
  ];

  const activities = [
    {
      id: 1,
      user: 'You',
      action: 'uploaded grades for',
      target: 'Introduction to Computer Science',
      time: '2 hours ago'
    },
    {
      id: 2,
      user: 'System',
      action: 'assigned new student to',
      target: 'Database Systems',
      time: '1 day ago'
    },
    {
      id: 3,
      user: 'You',
      action: 'marked attendance for',
      target: 'Web Development',
      time: '1 day ago'
    },
    {
      id: 4,
      user: 'Admin',
      action: 'scheduled exam for',
      target: 'Object Oriented Programming',
      time: '2 days ago'
    }
  ];

  const todayClasses = [
    {
      id: 1,
      course: 'Web Development',
      time: '9:00 AM - 10:30 AM',
      location: 'Room 201'
    },
    {
      id: 2,
      course: 'Database Systems',
      time: '11:00 AM - 12:30 PM',
      location: 'Room 105'
    },
    {
      id: 3,
      course: 'Object Oriented Programming',
      time: '2:00 PM - 3:30 PM',
      location: 'Room 301'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Faculty Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
              <h2 className="text-lg font-semibold text-gray-800">Today's Classes</h2>
              <Calendar className="h-5 w-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              {todayClasses.map(cls => (
                <div key={cls.id} className="border-l-4 border-college-accent-blue pl-3 py-1">
                  <h3 className="font-medium text-gray-900">{cls.course}</h3>
                  <p className="text-sm text-gray-600">{cls.time}</p>
                  <p className="text-xs text-gray-500">{cls.location}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
