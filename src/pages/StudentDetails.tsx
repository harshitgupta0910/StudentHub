import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, GraduationCap, Mail } from 'lucide-react';
import { fetchStudentById } from '../services/api';
import { Student } from '../types';
import Loading from '../components/ui/Loading';

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getStudent = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await fetchStudentById(id);
        setStudent(data);
      } catch (err) {
        console.error('Error fetching student:', err);
        setError('Failed to fetch student details. The student may not exist.');
      } finally {
        setLoading(false);
      }
    };

    getStudent();
  }, [id]);

  if (loading) {
    return <Loading message="Loading student details..." />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </button>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-600 mb-4">Student not found</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link 
        to="/"
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
      </Link>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-8 sm:p-10 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center border-4 border-white shadow-sm">
              {student.avatar ? (
                <img 
                  src={student.avatar} 
                  alt={student.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-3xl font-bold text-blue-600">
                  {student.name.charAt(0)}
                </div>
              )}
            </div>
            
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <GraduationCap className="mr-1 h-3 w-3" />
                  {student.course}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  student.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 
                  student.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' : 
                  student.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  Grade: {student.grade}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <GraduationCap className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Course</p>
                  <p className="text-sm text-gray-600">{student.course}</p>
                </div>
              </div>
              <div className="flex items-start">
                <CalendarDays className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Enrollment Date</p>
                  <p className="text-sm text-gray-600">
                    {new Date(student.enrollmentDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;