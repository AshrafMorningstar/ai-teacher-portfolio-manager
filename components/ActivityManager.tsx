
import React, { useState } from 'react';
import { User, Practice, Seminar } from '../types';
import { analyzePDF } from '../services/gemini';

interface ActivityManagerProps {
  user: User;
  practices: Practice[];
  seminars: Seminar[];
  actions: {
    addPractice: (p: Practice) => void;
    updatePractice: (p: Practice) => void;
    deletePractice: (id: string) => void;
    addSeminar: (s: Seminar) => void;
    updateSeminar: (s: Seminar) => void;
    deleteSeminar: (id: string) => void;
  }
}

const ActivityManager: React.FC<ActivityManagerProps> = ({ user, practices, seminars, actions }) => {
  const [showModal, setShowModal] = useState<'practice' | 'seminar' | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [pForm, setPForm] = useState({ title: '', description: '', date: '', file: null as File | null });
  const [sForm, setSForm] = useState({ title: '', fromDate: '', toDate: '', file: null as File | null });

  const teacherPractices = practices.filter(p => p.teacherId === user.id);
  const teacherSeminars = seminars.filter(s => s.teacherId === user.id);

  const handleFileUpload = async (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.');
      return null;
    }
    setLoading(true);
    try {
      // Convert to base64 for simulation and Gemini processing
      const reader = new FileReader();
      return new Promise<string>((resolve) => {
        reader.onloadend = async () => {
          const base64 = (reader.result as string).split(',')[1];
          // We don't actually have a server, so we extract using Gemini directly
          const extracted = await analyzePDF(base64);
          resolve(extracted);
        };
        reader.readAsDataURL(file);
      });
    } catch (e) {
      console.error(e);
      return 'Extraction failed';
    } finally {
      setLoading(false);
    }
  };

  const submitPractice = async (e: React.FormEvent) => {
    e.preventDefault();
    let extracted = '';
    if (pForm.file) {
      extracted = await handleFileUpload(pForm.file) || '';
    }
    const newP: Practice = {
      id: Math.random().toString(36).substr(2, 9),
      teacherId: user.id,
      title: pForm.title,
      description: pForm.description,
      date: pForm.date,
      proofUrl: pForm.file ? 'Simulated_URL_PDF' : undefined,
      extractedContent: extracted
    };
    actions.addPractice(newP);
    setShowModal(null);
    setPForm({ title: '', description: '', date: '', file: null });
  };

  const submitSeminar = async (e: React.FormEvent) => {
    e.preventDefault();
    let extracted = '';
    if (sForm.file) {
      extracted = await handleFileUpload(sForm.file) || '';
    }
    const newS: Seminar = {
      id: Math.random().toString(36).substr(2, 9),
      teacherId: user.id,
      title: sForm.title,
      fromDate: sForm.fromDate,
      toDate: sForm.toDate,
      proofUrl: sForm.file ? 'Simulated_URL_PDF' : undefined,
      extractedContent: extracted
    };
    actions.addSeminar(newS);
    setShowModal(null);
    setSForm({ title: '', fromDate: '', toDate: '', file: null });
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tighter">Your Activities</h1>
          <p className="text-zinc-500 mt-2">Manage your professional practices and seminars.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowModal('practice')}
            className="bg-white text-black px-6 py-3 rounded-2xl text-sm font-semibold hover:bg-zinc-200 transition-all"
          >
            + New Practice
          </button>
          <button 
            onClick={() => setShowModal('seminar')}
            className="bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-2xl text-sm font-semibold hover:border-zinc-600 transition-all"
          >
            + New Seminar
          </button>
        </div>
      </header>

      <section className="space-y-6">
        <h3 className="text-2xl font-light">Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teacherPractices.map(p => (
            <div key={p.id} className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 hover:border-zinc-500 transition-all">
              <div className="flex justify-between mb-4">
                <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded uppercase tracking-widest text-zinc-400">Activity</span>
                <button onClick={() => actions.deletePractice(p.id)} className="text-zinc-600 hover:text-red-400">✕</button>
              </div>
              <h4 className="text-lg font-medium">{p.title}</h4>
              <p className="text-zinc-500 text-sm mt-2 line-clamp-2">{p.description}</p>
              <p className="text-xs text-zinc-600 mt-4">{p.date}</p>
              {p.extractedContent && (
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <p className="text-[10px] text-zinc-500 uppercase mb-1">AI Extracted Summary</p>
                  <p className="text-[10px] text-zinc-400 italic line-clamp-3">{p.extractedContent}</p>
                </div>
              )}
            </div>
          ))}
          {teacherPractices.length === 0 && <p className="text-zinc-600 italic">No practices added yet.</p>}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-light">Seminars</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teacherSeminars.map(s => (
            <div key={s.id} className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 hover:border-zinc-500 transition-all">
              <div className="flex justify-between mb-4">
                <span className="text-[10px] bg-white text-black px-2 py-1 rounded uppercase tracking-widest">Seminar</span>
                <button onClick={() => actions.deleteSeminar(s.id)} className="text-zinc-600 hover:text-red-400">✕</button>
              </div>
              <h4 className="text-lg font-medium">{s.title}</h4>
              <p className="text-xs text-zinc-500 mt-2">{s.fromDate} — {s.toDate}</p>
              {s.extractedContent && (
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <p className="text-[10px] text-zinc-500 uppercase mb-1">AI Extracted Summary</p>
                  <p className="text-[10px] text-zinc-400 italic line-clamp-3">{s.extractedContent}</p>
                </div>
              )}
            </div>
          ))}
          {teacherSeminars.length === 0 && <p className="text-zinc-600 italic">No seminars added yet.</p>}
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 w-full max-w-xl p-8 rounded-3xl border border-zinc-800 shadow-3xl animate-fadeIn">
            <h2 className="text-2xl font-light mb-6">Add {showModal === 'practice' ? 'Practice' : 'Seminar'}</h2>
            
            <form onSubmit={showModal === 'practice' ? submitPractice : submitSeminar} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-zinc-500 mb-1">Title</label>
                <input 
                  required
                  className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-white transition-colors"
                  onChange={e => showModal === 'practice' ? setPForm({...pForm, title: e.target.value}) : setSForm({...sForm, title: e.target.value})}
                />
              </div>

              {showModal === 'practice' ? (
                <>
                  <div>
                    <label className="block text-xs uppercase text-zinc-500 mb-1">Description</label>
                    <textarea 
                      className="w-full bg-black border border-zinc-800 p-3 rounded-xl h-24 focus:border-white transition-colors"
                      onChange={e => setPForm({...pForm, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-zinc-500 mb-1">Date</label>
                    <input 
                      type="date"
                      required
                      className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-white transition-colors"
                      onChange={e => setPForm({...pForm, date: e.target.value})}
                    />
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-zinc-500 mb-1">From</label>
                    <input 
                      type="date"
                      required
                      className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-white transition-colors"
                      onChange={e => setSForm({...sForm, fromDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-zinc-500 mb-1">To</label>
                    <input 
                      type="date"
                      required
                      className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-white transition-colors"
                      onChange={e => setSForm({...sForm, toDate: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase text-zinc-500 mb-1">Upload Proof (PDF Only)</label>
                <input 
                  type="file"
                  accept=".pdf"
                  className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
                  onChange={e => {
                    const file = e.target.files?.[0] || null;
                    if (showModal === 'practice') setPForm({...pForm, file});
                    else setSForm({...sForm, file});
                  }}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(null)}
                  className="flex-1 bg-transparent border border-zinc-800 text-zinc-400 p-3 rounded-xl hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  disabled={loading}
                  type="submit" 
                  className="flex-1 bg-white text-black font-bold p-3 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50"
                >
                  {loading ? 'Processing PDF...' : 'Save Activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityManager;
