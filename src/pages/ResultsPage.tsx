import { motion } from 'framer-motion';
import { useAthletes } from '../hooks/useAthletes';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

const formatDate = (iso?: string) => {
      if (!iso) return '—';
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return iso;
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

const shortDiscipline = (text?: string) => {
      if (!text) return '';
      const t = text.toLowerCase();
      if (t.includes('halfpipe')) return 'HP';
      if (t.includes('big air')) return 'BA';
      if (t.includes('slalom') && t.includes('giant')) return 'GS';
      if (t.includes('slalom')) return 'SL';
      if (t.includes('parallel') && t.includes('giant')) return 'PGS';
      if (t.includes('parallel') && t.includes('slalom')) return 'PSL';
      if (t.includes('snowboard cross')) return 'SBX';
      if (t.includes('ski cross')) return 'SX';
      return text;
};

export const ResultsPage = () => {
      const { athletes } = useAthletes();
      const navigate = useNavigate();
      const [page, setPage] = useState(1);
      const pageSize = 10;

      const events = useMemo(() => {
            const flat = athletes.flatMap((athlete) =>
                  (athlete.recent_results || []).map((r: any) => ({
                        ...r,
                        athlete
                  }))
            );
            return flat
                  .filter(r => r.date)
                  .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      }, [athletes]);

      const totalPages = Math.max(1, Math.ceil(events.length / pageSize));
      const start = (page - 1) * pageSize;
      const pageItems = events.slice(start, start + pageSize);

      return (
            <div className="min-h-screen bg-[#1e1e1e] text-[#f5f5f5] selection:bg-primary/30 antialiased pb-32">
                  <main className="max-w-[480px] mx-auto px-6 py-10 space-y-8">
                        <header className="space-y-6 pt-4">
                              <div className="flex items-center justify-between">
                                    <div>
                                          <h1 className="text-2xl font-black italic tracking-tighter text-white mb-1 uppercase">Competition</h1>
                                          <p className="text-[var(--primary)] text-[10px] font-bold uppercase tracking-[0.2em] italic">Milano Cortina 2026</p>
                                    </div>
                                    <button className="size-10 rounded-2xl glass-card flex items-center justify-center text-gray-300 border-white/5">
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M4 21v-7m0-4V3m8 21v-11m0-4V3m8 21v-2m0-4V3M1 14h6m2-7h6m2 12h6" strokeLinecap="round" strokeLinejoin="round" />
                                          </svg>
                                    </button>
                              </div>

                              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                                    {['All Sports'].map((knob, i) => (
                                          <button
                                                key={knob}
                                                className={`px-5 py-2 rounded-full text-[11px] font-bold border transition-all duration-300 whitespace-nowrap uppercase italic
                                    ${i === 0 ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-400'}`}
                                          >
                                                {knob}
                                          </button>
                                    ))}
                              </div>
                        </header>

                        <div className="space-y-3">
                              {pageItems.map((item, idx) => (
                                    <motion.div
                                          key={`${item.athlete?.fis_code}-${idx}`}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: idx * 0.03 }}
                                          onClick={() => navigate(`/profile/${item.athlete?.id || item.athlete?.fis_code}`)}
                                          className="glass-card grid grid-cols-12 items-center p-4 rounded-3xl border-white/5 cursor-pointer hover:bg-white/[0.03] transition-colors"
                                    >
                                          <div className="col-span-3 flex flex-col items-start">
                                                <span className="text-[11px] text-gray-400 uppercase">{formatDate(item.date)}</span>
                                                <span className="text-[10px] text-gray-500 uppercase">{item.nation || item.athlete?.team}</span>
                                          </div>
                                          <div className="col-span-6 flex flex-col min-w-0">
                                                <span className="font-bold text-sm text-white uppercase italic truncate">{item.athlete?.name_ko || item.athlete?.name_en}</span>
                                                <span className="text-[10px] text-gray-400 font-medium whitespace-normal leading-tight">
                                                      {item.place || '—'} · {shortDiscipline(item.discipline || item.category)}
                                                </span>
                                          </div>
                                          <div className="col-span-3 text-right">
                                                <span className="block text-[10px] text-gray-500 uppercase">Rank</span>
                                                <span className="block font-black text-sm text-white italic">{item.rank ? `#${item.rank}` : (item.rank_status || 'DNS/DNF')}</span>
                                                <span className="block text-[10px] text-gray-500 mt-1">FIS {typeof item.points === 'number' ? item.points.toFixed(2) : '—'}</span>
                                          </div>
                                    </motion.div>
                              ))}
                              {!pageItems.length && (
                                    <div className="text-sm text-gray-500 text-center py-10">No results found</div>
                              )}
                        </div>

                        <div className="flex items-center justify-center gap-2 pt-4">
                              <button
                                    className="size-10 rounded-2xl glass-card flex items-center justify-center text-gray-500 border-white/5"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                              >
                                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                              </button>
                              {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => {
                                    const p = i + 1;
                                    return (
                                          <button
                                                key={p}
                                                className={`size-10 rounded-2xl font-black text-sm italic ${p === page ? 'bg-white text-black' : 'glass-card text-gray-400 border-white/5'}`}
                                                onClick={() => setPage(p)}
                                          >
                                                {p}
                                          </button>
                                    );
                              })}
                              <button
                                    className="size-10 rounded-2xl glass-card flex items-center justify-center text-gray-500 border-white/5"
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                              >
                                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                              </button>
                        </div>
                  </main>
            </div>
      );
};
