
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Search, Plus, Edit, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  department: string;
  semester: string;
  status: 'active' | 'inactive';
}

const SAMPLE_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    rollNo: 'CS-2023-001',
    department: 'Computer Science',
    semester: '3rd',
    status: 'active'
  },
  {
    id: '2',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    rollNo: 'CS-2023-002',
    department: 'Computer Science',
    semester: '3rd',
    status: 'active'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    rollNo: 'EE-2023-001',
    department: 'Electrical Engineering',
    semester: '2nd',
    status: 'active'
  },
  {
    id: '4',
    name: 'Sophia Davis',
    email: 'sophia.davis@example.com',
    rollNo: 'ME-2023-001',
    department: 'Mechanical Engineering',
    semester: '4th',
    status: 'inactive'
  },
  {
    id: '5',
    name: 'William Wilson',
    email: 'william.wilson@example.com',
    rollNo: 'CS-2023-003',
    department: 'Computer Science',
    semester: '1st',
    status: 'active'
  },
  {
    id: '6',
    name: 'Olivia Martinez',
    email: 'olivia.martinez@example.com',
    rollNo: 'BBA-2023-001',
    department: 'Business Administration',
    semester: '5th',
    status: 'active'
  },
  {
    id: '7',
    name: 'James Taylor',
    email: 'james.taylor@example.com',
    rollNo: 'CE-2023-001',
    department: 'Civil Engineering',
    semester: '2nd',
    status: 'active'
  }
];

const DEPARTMENTS = [
  'All Departments',
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration'
];

const SEMESTERS = ['All Semesters', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

const Students = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>(SAMPLE_STUDENTS);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(SAMPLE_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedSemester, setSelectedSemester] = useState('All Semesters');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    email: '',
    rollNo: '',
    department: 'Computer Science',
    semester: '1st',
    status: 'active'
  });

  // Only allow admin and faculty to access this page
  if (user?.role !== 'admin' && user?.role !== 'faculty') {
    return <Navigate to="/" />;
  }

  const filterStudents = () => {
    let filtered = students;
    
    if (searchQuery) {
      filtered = filtered.filter(
        student =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedDepartment !== 'All Departments') {
      filtered = filtered.filter(student => student.department === selectedDepartment);
    }
    
    if (selectedSemester !== 'All Semesters') {
      filtered = filtered.filter(student => student.semester === selectedSemester);
    }
    
    setFilteredStudents(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    filterStudents();
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
    filterStudents();
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(e.target.value);
    filterStudents();
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.rollNo) {
      const student: Student = {
        id: String(Date.now()),
        name: newStudent.name,
        email: newStudent.email,
        rollNo: newStudent.rollNo,
        department: newStudent.department || 'Computer Science',
        semester: newStudent.semester || '1st',
        status: 'active'
      };

      setStudents([...students, student]);
      setFilteredStudents([...filteredStudents, student]);
      setNewStudent({
        name: '',
        email: '',
        rollNo: '',
        department: 'Computer Science',
        semester: '1st',
        status: 'active'
      });
      setIsAddingStudent(false);
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setNewStudent(student);
  };

  const handleUpdateStudent = () => {
    if (editingStudent && newStudent.name && newStudent.email && newStudent.rollNo) {
      const updatedStudents = students.map(student => 
        student.id === editingStudent.id ? { ...student, ...newStudent } as Student : student
      );
      
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
      setEditingStudent(null);
      setNewStudent({
        name: '',
        email: '',
        rollNo: '',
        department: 'Computer Science',
        semester: '1st',
        status: 'active'
      });
    }
  };

  const handleDeleteStudent = (id: string) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
        
        {user?.role === 'admin' && (
          <Button 
            className="bg-college-purple hover:bg-college-purple/90"
            onClick={() => {
              setIsAddingStudent(!isAddingStudent);
              setEditingStudent(null);
              setNewStudent({
                name: '',
                email: '',
                rollNo: '',
                department: 'Computer Science',
                semester: '1st',
                status: 'active'
              });
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        )}
      </div>

      {(isAddingStudent || editingStudent) && (
        <Card className="mb-6 p-4">
          <h2 className="text-lg font-semibold mb-4">
            {editingStudent ? 'Edit Student' : 'Add New Student'}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple"
                placeholder="John Smith"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple"
                placeholder="john.smith@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Roll Number</label>
              <input
                type="text"
                value={newStudent.rollNo}
                onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple"
                placeholder="CS-2023-001"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select
                value={newStudent.department}
                onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple"
              >
                {DEPARTMENTS.slice(1).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Semester</label>
              <select
                value={newStudent.semester}
                onChange={(e) => setNewStudent({ ...newStudent, semester: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple"
              >
                {SEMESTERS.slice(1).map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={newStudent.status}
                onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value as 'active' | 'inactive' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline"
              className="mr-2"
              onClick={() => {
                setIsAddingStudent(false);
                setEditingStudent(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              className="bg-college-purple hover:bg-college-purple/90"
              onClick={editingStudent ? handleUpdateStudent : handleAddStudent}
              disabled={!newStudent.name || !newStudent.email || !newStudent.rollNo}
            >
              {editingStudent ? 'Update Student' : 'Add Student'}
            </Button>
          </div>
        </Card>
      )}

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students by name, email or roll number"
              className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:border-college-purple focus:ring focus:ring-college-purple focus:ring-opacity-50"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex space-x-3">
            <div className="relative">
              <select
                className="pl-10 pr-8 py-2 rounded-md border border-gray-300 focus:border-college-purple focus:ring focus:ring-college-purple focus:ring-opacity-50 appearance-none"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="pl-10 pr-8 py-2 rounded-md border border-gray-300 focus:border-college-purple focus:ring focus:ring-college-purple focus:ring-opacity-50 appearance-none"
                value={selectedSemester}
                onChange={handleSemesterChange}
              >
                {SEMESTERS.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {user?.role === 'admin' && (
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-college-light-purple text-white flex items-center justify-center">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.rollNo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.semester}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  {user?.role === 'admin' && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEditStudent(student)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredStudents.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No students found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
