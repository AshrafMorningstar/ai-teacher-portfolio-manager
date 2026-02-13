
import React from 'react';
import { User, UserRole } from '../types';

interface SidebarProps {
  user: User;
  activeTab: string;
  setActiveTab: (t: any) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: '🏠' },
    { id: 'profile', label: 'My Profile', icon: '👤' },
    { id: 'activities', label: 'Activities', icon: '📝' },
  ];

  if (user.role === UserRole.ADMIN) {
    menuItems.push({ id: 'management', label: 'Teacher Mgmt', icon: '⚙️' });
  }

  return (
    <aside className="w-72 bg-zinc-950 border-r border-zinc-900 flex flex-col p-8 transition-all duration-300">
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tighter">Pfolio.</h2>
        <div className="mt-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Authenticated as</p>
          <p className="font-medium text-sm truncate">{user.name}</p>
          <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full mt-2 inline-block">
            {user.role}
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm transition-all duration-300 ${activeTab === item.id ? 'bg-white text-black shadow-lg scale-105' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <button 
        onClick={onLogout}
        className="mt-8 flex items-center gap-4 px-6 py-4 rounded-2xl text-sm text-zinc-500 hover:text-red-400 hover:bg-red-950/20 transition-all border border-transparent hover:border-red-900/50"
      >
        <span>🚪</span>
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
