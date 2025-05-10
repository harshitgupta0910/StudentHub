import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users } from 'lucide-react';
import { fetchStudents } from '../services/api';
import { Student } from '../types';
import { useAuth } from '../context/AuthContext';
import StudentList from '../components/StudentList';

const Dashboard = () => {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to fetch students. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getStudents();
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage and view all students in the system
          </p>
        </div>

        
        {currentUser ? (
          <Link
            to="/add-student"
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
          >
            Login to Add Students
          </Link>
        )}
      </header>


      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <Users className="h-5 w-5 text-blue-500" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              {students ? (
                `Currently displaying ${students.length} students. ${!currentUser ? 'Login to view student details and add new students.' : ''}`
              ) : (
                'Loading student data...'
              )}
            </p>
          </div>
        </div>
      </div>
      
      {error ? (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      ) : (
        <StudentList students={students} loading={loading} />
      )}
    </div>
  );
  
};

export default Dashboard;