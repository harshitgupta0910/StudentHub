import { useEffect } from 'react';
import StudentForm from '../components/StudentForm';

const AddStudent = () => {
  useEffect(() => {
    console.log('AddStudent component mounted - Check Network tab for Firebase authentication calls');
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Add New Student</h1>
        <p className="mt-1 text-sm text-gray-600">
          Fill in the student information below
        </p>
      </header>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <StudentForm />
        </div>
      </div>
    </div>
  );
};

export default AddStudent;