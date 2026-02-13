
import React from 'react';
import { User, Practice, Seminar } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface TeacherHomeProps {
  user: User;
  practices: Practice[];
  seminars: Seminar[];
}

const TeacherHome: React.FC<TeacherHomeProps> = ({ user, practices, seminars }) => {
  const teacherPractices = practices.filter(p => p.teacherId === user.id);
  const teacherSeminars = seminars.filter(s => s.teacherId === user.id);

  const chartData = [
    { name: 'Jan', count: 2 },
    { name: 'Feb', count: 5 },
    { name: 'Mar', count: 3 },
    { name: 'Apr', count: teacherPractices.length + teacherSeminars.length },
    { name: 'May', count: 0 },
    { name: 'Jun', count: 0 },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-5xl font-light tracking-tighter">Welcome, {user.name}</h1>
        <p className="text-zinc-500 mt-2">Here is an overview of your professional activities.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Practices', value: teacherPractices.length, icon: '🔥' },
          { label: 'Total Seminars', value: teacherSeminars.length, icon: '🎓' },
          { label: 'Proofs Uploaded', value: teacherPractices.filter(p => p.proofUrl).length + teacherSeminars.filter(s => s.proofUrl).length, icon: '📄' }
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900/50 backdrop-blur border border-zinc-800 p-8 rounded-3xl hover:border-zinc-600 transition-all group">
            <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-500">{stat.icon}</div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">{stat.label}</p>
            <p className="text-4xl font-light">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
          <h3 className="text-xl font-light mb-8">Activity Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fff" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="count" stroke="#fff" fillOpacity={1} fill="url(#colorCount)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
          <h3 className="text-xl font-light mb-8">Recent Submissions</h3>
          <div className="space-y-4">
            {teacherPractices.slice(0, 3).map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-zinc-800/50">
                <div>
                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{p.date}</p>
                </div>
                <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded">Practice</span>
              </div>
            ))}
            {teacherPractices.length === 0 && <p className="text-zinc-500 text-sm italic">No recent activities found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
