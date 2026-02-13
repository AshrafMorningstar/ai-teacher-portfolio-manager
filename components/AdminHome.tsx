
import React, { useState } from 'react';
import { User, Practice, Seminar } from '../types';

interface AdminHomeProps {
  teachers: User[];
  practices: Practice[];
  seminars: Seminar[];
  isManagementOnly?: boolean;
}

const AdminHome: React.FC<AdminHomeProps> = ({ teachers, practices, seminars, isManagementOnly }) => {
  const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);

  const teacherPractices = practices.filter(p => p.teacherId === selectedTeacher?.id);
  const teacherSeminars = seminars.filter(s => s.teacherId === selectedTeacher?.id);

  if (selectedTeacher) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <button 
          onClick={() => setSelectedTeacher(null)}
          className="text-zinc-500 hover:text-white flex items-center gap-2 mb-4"
        >
          ← Back to Overview
        </button>
        <header>
          <h1 className="text-4xl font-light tracking-tighter">Portfolio: {selectedTeacher.name}</h1>
          <p className="text-zinc-500">{selectedTeacher.email} | {selectedTeacher.qualifications}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
            <h3 className="text-xl font-light mb-6">Practices</h3>
            <div className="space-y-4">
              {teacherPractices.map(p => (
                <div key={p.id} className="p-4 bg-black/40 rounded-2xl border border-zinc-800/50">
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-zinc-500 mb-2">{p.date}</p>
                  {p.extractedContent && (
                    <div className="mt-2 text-[10px] text-zinc-400 bg-zinc-900 p-2 rounded italic border border-zinc-800">
                      {p.extractedContent}
                    </div>
                  )}
                </div>
              ))}
              {teacherPractices.length === 0 && <p className="text-zinc-600 italic">No practices found.</p>}
            </div>
          </section>

          <section className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
            <h3 className="text-xl font-light mb-6">Seminars</h3>
            <div className="space-y-4">
              {teacherSeminars.map(s => (
                <div key={s.id} className="p-4 bg-black/40 rounded-2xl border border-zinc-800/50">
                  <p className="font-medium">{s.title}</p>
                  <p className="text-xs text-zinc-500 mb-2">{s.fromDate} to {s.toDate}</p>
                  {s.extractedContent && (
                    <div className="mt-2 text-[10px] text-zinc-400 bg-zinc-900 p-2 rounded italic border border-zinc-800">
                      {s.extractedContent}
                    </div>
                  )}
                </div>
              ))}
              {teacherSeminars.length === 0 && <p className="text-zinc-600 italic">No seminars found.</p>}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {!isManagementOnly && (
        <>
          <header>
            <h1 className="text-5xl font-light tracking-tighter">System Console</h1>
            <p className="text-zinc-500 mt-2">Global monitoring and administrative controls.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Teachers', value: teachers.length, icon: '👥' },
              { label: 'Global Practices', value: practices.length, icon: '🔥' },
              { label: 'Global Seminars', value: seminars.length, icon: '🎓' },
              { label: 'System Health', value: '100%', icon: '🛡️' }
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-900/50 backdrop-blur border border-zinc-800 p-6 rounded-3xl">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{stat.label}</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-light">{stat.value}</p>
                  <span className="text-xl opacity-50">{stat.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl overflow-hidden backdrop-blur-sm">
        <div className="p-8 border-b border-zinc-800">
          <h3 className="text-xl font-light">Teacher Accounts Management</h3>
          <p className="text-sm text-zinc-500 mt-1">Review activity and manage access permissions.</p>
        </div>
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-widest text-zinc-500 bg-black/20">
            <tr>
              <th className="px-8 py-4 font-medium">Name</th>
              <th className="px-8 py-4 font-medium">Email</th>
              <th className="px-8 py-4 font-medium">Activities</th>
              <th className="px-8 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {teachers.map(t => (
              <tr key={t.id} className="hover:bg-zinc-900/50 transition-colors group">
                <td className="px-8 py-6">
                  <p className="font-medium text-white">{t.name}</p>
                  <p className="text-[10px] text-zinc-600">{t.qualifications || 'No qualifications listed'}</p>
                </td>
                <td className="px-8 py-6 text-sm text-zinc-400">{t.email}</td>
                <td className="px-8 py-6">
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-400">
                      {practices.filter(p => p.teacherId === t.id).length} Practices
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-400">
                      {seminars.filter(s => s.teacherId === t.id).length} Seminars
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <button 
                    onClick={() => setSelectedTeacher(t)}
                    className="text-xs bg-white text-black px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    View Portfolio
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminHome;
