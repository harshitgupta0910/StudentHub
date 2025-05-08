import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Student } from '../types';

// Create axios instance
const api = axios.create({
  baseURL: '/api'
});

// Create mock adapter
const mock = new MockAdapter(api, { delayResponse: 1000 });

// Mock data
const students: Student[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    course: 'Computer Science',
    grade: 'A',
    enrollmentDate: '2023-09-01',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    course: 'Data Science',
    grade: 'B+',
    enrollmentDate: '2023-08-15',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    name: 'Sophia Rodriguez',
    email: 'sophia.rodriguez@example.com',
    course: 'Business Administration',
    grade: 'A-',
    enrollmentDate: '2023-09-05',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    course: 'Computer Science',
    grade: 'B',
    enrollmentDate: '2023-08-20',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '5',
    name: 'Olivia Davis',
    email: 'olivia.davis@example.com',
    course: 'Graphic Design',
    grade: 'A+',
    enrollmentDate: '2023-09-10',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '6',
    name: 'William Zhang',
    email: 'william.zhang@example.com',
    course: 'Data Science',
    grade: 'A',
    enrollmentDate: '2023-08-25',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '7',
    name: 'Ava Martinez',
    email: 'ava.martinez@example.com',
    course: 'Psychology',
    grade: 'B+',
    enrollmentDate: '2023-09-15',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '8',
    name: 'Daniel Thompson',
    email: 'daniel.thompson@example.com',
    course: 'Computer Science',
    grade: 'A-',
    enrollmentDate: '2023-08-30',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600',
  }
];

// API endpoints
mock.onGet('/students').reply(200, students);

mock.onGet(/\/students\/\d+/).reply((config) => {
  const id = config.url?.split('/').pop();
  const student = students.find((s) => s.id === id);
  
  return student 
    ? [200, student] 
    : [404, { message: 'Student not found' }];
});

mock.onPost('/students').reply((config) => {
  const newStudent = JSON.parse(config.data);
  newStudent.id = String(students.length + 1);
  students.push(newStudent);
  
  return [201, newStudent];
});

// API functions
export const fetchStudents = async (): Promise<Student[]> => {
  const response = await api.get('/students');
  return response.data;
};

export const fetchStudentById = async (id: string): Promise<Student> => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

export const addStudent = async (student: Omit<Student, 'id'>): Promise<Student> => {
  const response = await api.post('/students', student);
  return response.data;
};

export default api;