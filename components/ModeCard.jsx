import { Lock, Sparkles } from 'lucide-react';

export default function ModeCard({ mode, selected, onSelect }) {
  const active = mode.status === 'active';

  return (
    <button
      onClick={() => active && onSelect(mode.id)}
      className={`group text-left rounded-[1.6rem] p-5 transition-all border min-h-[250px] ${
        selected
          ? 'bg-gradient-to-br from-purple-600/20 via-slate-900 to-indigo-600/10 border-purple-400/70 shadow-[0_0_45px_rgba(124,58,237,.20)]'
          : 'bg-slate-950/80 border-white/10 hover:border-purple-400/50 hover:bg-slate-900/90'
      } ${!active ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${selected ? 'premium-button' : 'bg-white/8 border border-white/10 text-slate-200'}`}>
          {active ? <Sparkles size={20} /> : <Lock size={18} />}
        </div>
        <span className={`text-xs px-3 py-1 rounded-full border ${active ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20' : 'bg-amber-500/10 text-amber-300 border-amber-400/20'}`}>
          {active ? 'Active' : 'Coming soon'}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-bold text-white">{mode.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{mode.description}</p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs">
        <span className="px-3 py-1 rounded-full bg-white/8 border border-white/10 text-slate-200">{mode.checks}</span>
        <span className="px-3 py-1 rounded-full bg-white/8 border border-white/10 text-slate-200">{mode.difficulty}</span>
        <span className="px-3 py-1 rounded-full bg-white/8 border border-white/10 text-slate-200">{mode.time}</span>
      </div>
    </button>
  );
}
