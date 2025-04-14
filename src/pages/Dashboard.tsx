
import { useAuth } from '../hooks/useAuth';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import FacultyDashboard from '../components/dashboard/FacultyDashboard';
import StudentDashboard from '../components/dashboard/StudentDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div>
      {user?.role === 'admin' && <AdminDashboard />}
      {user?.role === 'faculty' && <FacultyDashboard />}
      {user?.role === 'student' && <StudentDashboard />}
    </div>
  );
};

export default Dashboard;
