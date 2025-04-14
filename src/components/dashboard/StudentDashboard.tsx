
import { BookOpen, Award, Clock, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import RecentActivity from './RecentActivity';
import QuickStats from './QuickStats';

const StudentDashboard = () => {
  const stats = [
    {
      title: 'Courses Enrolled',
      value: '6',
      icon: <BookOpen className="h-6 w-6" />,
      change: '',
      color: 'border-college-accent-blue'
    },
    {
      title: 'Attendance',
      value: '92%',
      icon: <Clock className="h-6 w-6" />,
      change: '-2%',
      color: 'border-college-accent-orange'
    },
    {
      title: 'Current GPA',
      value: '3.8',
      icon: <Award className="h-6 w-6" />,
      change: '+0.2',
      color: 'border-college-accent-green'
    },
  ];

  const activities = [
    {
      id: 1,
      user: 'Prof. Smith',
      action: 'graded your submission for',
      target: 'Database Systems',
      time: 'Yesterday'
    },
    {
      id: 2,
      user: 'You',
      action: 'submitted assignment for',
      target: 'Web Development',
      time: '2 days ago'
    },
    {
      id: 3,
      user: 'Prof. Johnson',
      action: 'marked your attendance for',
      target: 'Object Oriented Programming',
      time: '3 days ago'
    },
    {
      id: 4,
      user: 'Admin',
      action: 'published exam schedule for',
      target: 'Mid-Term Examinations',
      time: '1 week ago'
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'Database Project Submission',
      date: 'Tomorrow, 11:59 PM',
      course: 'Database Systems'
    },
    {
      id: 2,
      title: 'Web Development Quiz',
      date: 'Jul 18, 10:00 AM',
      course: 'Web Development'
    },
    {
      id: 3,
      title: 'OOP Assignment 3',
      date: 'Jul 20, 11:59 PM',
      course: 'Object Oriented Programming'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Student Dashboard</h1>
      
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
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Deadlines</h2>
              <Calendar className="h-5 w-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              {upcomingDeadlines.map(deadline => (
                <div key={deadline.id} className="border-l-4 border-college-accent-red pl-3 py-1">
                  <h3 className="font-medium text-gray-900">{deadline.title}</h3>
                  <p className="text-sm text-gray-600">{deadline.date}</p>
                  <p className="text-xs text-gray-500">{deadline.course}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
