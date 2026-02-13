
import React, { useState } from 'react';
import { User, UserRole, Practice, Seminar } from '../types';
import Sidebar from './Sidebar';
import TeacherHome from './TeacherHome';
import AdminHome from './AdminHome';
import ProfileView from './ProfileView';
import ActivityManager from './ActivityManager';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  teachers: User[];
  practices: Practice[];
  seminars: Seminar[];
  updateProfile: (u: User) => void;
  actions: {
    addPractice: (p: Practice) => void;
    updatePractice: (p: Practice) => void;
    deletePractice: (id: string) => void;
    addSeminar: (s: Seminar) => void;
    updateSeminar: (s: Seminar) => void;
    deleteSeminar: (id: string) => void;
  }
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, onLogout, teachers, practices, seminars, updateProfile, actions 
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'profile' | 'activities' | 'management'>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return user.role === UserRole.TEACHER 
          ? <TeacherHome user={user} practices={practices} seminars={seminars} /> 
          : <AdminHome teachers={teachers} practices={practices} seminars={seminars} />;
      case 'profile':
        return <ProfileView user={user} onUpdate={updateProfile} />;
      case 'activities':
        return <ActivityManager user={user} practices={practices} seminars={seminars} actions={actions} />;
      case 'management':
        return <AdminHome teachers={teachers} practices={practices} seminars={seminars} isManagementOnly />;
      default:
        return <div>Home</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={onLogout} 
      />
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-6xl mx-auto animate-fadeIn">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
