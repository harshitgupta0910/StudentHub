import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../services/api';
import { Student } from '../types';
import { AlertCircle } from 'lucide-react';

const courses = [
  'Computer Science',
  'Data Science',
  'Business Administration',
  'Graphic Design',
  'Psychology',
  'Mathematics',
  'Physics',
  'Chemistry',
  'English Literature'
];

const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

const StudentForm = () => {
  const [student, setStudent] = useState<Omit<Student, 'id'>>({
    name: '',
    email: '',
    course: '',
    grade: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    avatar: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!student.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!student.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!student.course) {
      newErrors.course = 'Course is required';
    }
    
    if (!student.grade) {
      newErrors.grade = 'Grade is required';
    }
    
    if (!student.enrollmentDate) {
      newErrors.enrollmentDate = 'Enrollment date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await addStudent(student);
      navigate('/');
    } catch (error) {
      console.error('Error adding student:', error);
      setSubmitError('Failed to add student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-sm text-red-700">{submitError}</p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={student.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.name ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700">
            Course <span className="text-red-500">*</span>
          </label>
          <select
            id="course"
            name="course"
            value={student.course}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.course ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          {errors.course && <p className="mt-1 text-xs text-red-600">{errors.course}</p>}
        </div>
        
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
            Grade <span className="text-red-500">*</span>
          </label>
          <select
            id="grade"
            name="grade"
            value={student.grade}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.grade ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select a grade</option>
            {grades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          {errors.grade && <p className="mt-1 text-xs text-red-600">{errors.grade}</p>}
        </div>
        
        <div>
          <label htmlFor="enrollmentDate" className="block text-sm font-medium text-gray-700">
            Enrollment Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="enrollmentDate"
            name="enrollmentDate"
            value={student.enrollmentDate}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.enrollmentDate ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.enrollmentDate && <p className="mt-1 text-xs text-red-600">{errors.enrollmentDate}</p>}
        </div>
        
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
            Avatar URL (Optional)
          </label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={student.avatar}
            onChange={handleChange}
            placeholder="https://example.com/avatar.jpg"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">Enter a URL for the student's profile image</p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Add Student'}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;