
import React, { useState, useEffect } from 'react';
import { User, UserRole, Practice, Seminar } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ThreeBackground from './components/ThreeBackground';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  
  // Mock initialization of state
  const [teachers, setTeachers] = useState<User[]>([
    { id: 't1', email: 'jane@edu.com', name: 'Jane Doe', role: UserRole.TEACHER, contact: '+123456789', qualifications: 'PhD Education' },
    { id: 't2', email: 'john@edu.com', name: 'John Smith', role: UserRole.TEACHER, contact: '+987654321', qualifications: 'Masters in STEM' },
  ]);

  const [practices, setPractices] = useState<Practice[]>([
    { id: 'p1', teacherId: 't1', title: 'Interactive Math Workshop', description: 'Used digital tablets for geometry.', date: '2023-10-15' },
    { id: 'p2', teacherId: 't2', title: 'Robotics Lab', description: 'Hands-on assembly session.', date: '2023-11-20' },
  ]);

  const [seminars, setSeminars] = useState<Seminar[]>([
    { id: 's1', teacherId: 't1', title: 'Global Pedagogy Summit', fromDate: '2023-09-01', toDate: '2023-09-05' },
  ]);

  const handleLogin = (u: User) => {
    setUser(u);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const updateTeacherProfile = (updated: User) => {
    setTeachers(prev => prev.map(t => t.id === updated.id ? updated : t));
    setUser(updated);
  };

  const addPractice = (p: Practice) => setPractices(prev => [...prev, p]);
  const updatePractice = (p: Practice) => setPractices(prev => prev.map(item => item.id === p.id ? p : item));
  const deletePractice = (id: string) => setPractices(prev => prev.filter(p => p.id !== id));

  const addSeminar = (s: Seminar) => setSeminars(prev => [...prev, s]);
  const updateSeminar = (s: Seminar) => setSeminars(prev => prev.map(item => item.id === s.id ? s : item));
  const deleteSeminar = (id: string) => setSeminars(prev => prev.filter(s => s.id !== id));

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <ThreeBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Dashboard 
            user={user} 
            onLogout={handleLogout}
            teachers={teachers}
            practices={practices}
            seminars={seminars}
            updateProfile={updateTeacherProfile}
            actions={{
              addPractice, updatePractice, deletePractice,
              addSeminar, updateSeminar, deleteSeminar
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
