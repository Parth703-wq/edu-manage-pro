
import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { GraduationCap } from 'lucide-react';

const Login = () => {
  const { login, user, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password, role);
  };

  return (
    <div className="min-h-screen bg-college-bg-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-college-purple p-6 text-center">
          <div className="mx-auto h-12 w-12 bg-white rounded-full flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-college-purple" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white">
            GEC Bharuch
          </h2>
          <p className="mt-2 text-sm text-white opacity-80">
            College Management System
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Sign in to your account
          </h3>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Login as
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-college-purple hover:bg-college-purple/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-college-purple disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Demo credentials
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                <div><strong>Admin:</strong> admin@example.com / admin123</div>
                <div><strong>Faculty:</strong> faculty@example.com / faculty123</div>
                <div><strong>Student:</strong> student@example.com / student123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
