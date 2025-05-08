export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  grade: string;
  enrollmentDate: string;
  avatar?: string;
}

export type AuthUser = {
  uid: string;
  email: string | null;
} | null;

export interface CourseFilter {
  label: string;
  value: string;
}