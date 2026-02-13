
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  onUpdate: (u: User) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({...user});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-10">
      <header>
        <h1 className="text-4xl font-light tracking-tighter">Professional Profile</h1>
        <p className="text-zinc-500 mt-2">Manage your public information and credentials.</p>
      </header>

      <div className="bg-zinc-900/50 p-10 rounded-3xl border border-zinc-800 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase text-zinc-500 mb-2">Full Name</label>
              <input 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black border border-zinc-800 p-4 rounded-xl focus:border-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-zinc-500 mb-2">Email</label>
              <input 
                disabled
                value={formData.email}
                className="w-full bg-black border border-zinc-800 p-4 rounded-xl opacity-50 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-zinc-500 mb-2">Contact Number</label>
            <input 
              value={formData.contact || ''}
              onChange={e => setFormData({...formData, contact: e.target.value})}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl focus:border-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-zinc-500 mb-2">Qualifications & Bio</label>
            <textarea 
              value={formData.qualifications || ''}
              onChange={e => setFormData({...formData, qualifications: e.target.value})}
              placeholder="List your degrees, certifications, and a brief biography..."
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl h-40 focus:border-white transition-colors"
            />
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              className={`w-full p-4 rounded-xl font-bold transition-all ${success ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-zinc-200'}`}
            >
              {success ? '✓ Profile Updated' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileView;
