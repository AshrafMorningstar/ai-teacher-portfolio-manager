
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.TEACHER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      role: role
    };
    onLogin(user);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl p-10 border border-zinc-800 shadow-2xl rounded-3xl transition-all duration-500 hover:border-zinc-700">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light tracking-tighter mb-2">Pfolio.</h1>
          <p className="text-zinc-500 text-sm">{isLogin ? 'Sign in to your workspace' : 'Create your professional account'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl focus:outline-none focus:border-white transition-colors"
              placeholder="name@institution.edu"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl focus:outline-none focus:border-white transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          {!isLogin && (
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">I am an</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setRole(UserRole.TEACHER)}
                  className={`p-3 rounded-xl border text-sm transition-all ${role === UserRole.TEACHER ? 'bg-white text-black border-white' : 'bg-transparent border-zinc-800 text-zinc-500'}`}
                >
                  Teacher
                </button>
                <button 
                  type="button"
                  onClick={() => setRole(UserRole.ADMIN)}
                  className={`p-3 rounded-xl border text-sm transition-all ${role === UserRole.ADMIN ? 'bg-white text-black border-white' : 'bg-transparent border-zinc-800 text-zinc-500'}`}
                >
                  Admin
                </button>
              </div>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-white text-black font-semibold p-4 rounded-xl hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {isLogin ? 'Enter System' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-zinc-500 text-sm hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
