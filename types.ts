
export enum UserRole {
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  contact?: string;
  qualifications?: string;
}

export interface Practice {
  id: string;
  teacherId: string;
  title: string;
  description: string;
  date: string;
  proofUrl?: string;
  extractedContent?: string;
}

export interface Seminar {
  id: string;
  teacherId: string;
  title: string;
  fromDate: string;
  toDate: string;
  proofUrl?: string;
  extractedContent?: string;
}

export interface AppState {
  currentUser: User | null;
  teachers: User[];
  practices: Practice[];
  seminars: Seminar[];
}
