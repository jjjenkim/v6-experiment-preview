import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAthletes } from '../hooks/useAthletes';
import { ArrowLeft } from 'lucide-react';

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

const buildLinePath = (values: number[], width: number, height: number) => {
      if (!values.length) return '';
      const max = Math.max(...values);
      const min = Math.min(...values);
      const range = max - min || 1;
      return values.map((v, i) => {
            const x = (i / (values.length - 1 || 1)) * width;
            const normalized = (max - v) / range;
            const y = height - normalized * height;
            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      }).join(' ');
};

export const ProfilePage = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const { athletes } = useAthletes();

      const athlete = athletes.find(a => (a.id || a.fis_code) === id);
      if (!athlete) return <div className="text-white text-center py-20">Athlete Not Found</div>;

      const recentResults = (athlete.recent_results || []).slice(0, 8);
      const trendRanks = recentResults.map((r: any) => r.rank).filter((r: any) => typeof r === 'number' && r > 0);
      const latestPoints = recentResults[0]?.points;
      const bestRank = athlete.best_rank;
      const currentRank = athlete.current_rank;
      const age = athlete.age || (athlete.birth_year ? 2026 - athlete.birth_year : undefined);

      return (
            <div className="min-h-screen bg-background-dark font-display text-white selection:bg-primary/30 relative">
                  <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-transparent max-w-[480px] mx-auto">
                        <button
                              onClick={() => navigate(-1)}
                              className="flex size-10 items-center justify-center rounded-full glass-card hover:bg-white/10 transition-colors"
                        >
                              <ArrowLeft size={18} />
                        </button>
                  </header>

                  <main className="max-w-[480px] mx-auto relative bg-[#0a0a0a] min-h-screen shadow-2xl">
                        <div className="relative h-[420px] w-full">
                              <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551698618-1fedfeadfe52?q=80&w=2070&auto=format&fit=crop')` }}
                              />
                              <div className="absolute inset-0 hero-gradient"></div>

                              <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <motion.span
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          className="inline-block px-3 py-1 bg-[var(--primary)] text-[10px] font-bold tracking-widest rounded-full mb-3 uppercase"
                                    >
                                          Team Korea
                                    </motion.span>
                                    <motion.h1
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.2 }}
                                          className="text-4xl font-extrabold tracking-tighter mb-1 uppercase italic"
                                    >
                                          {athlete.name_en}
                                    </motion.h1>
                                    <motion.p
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 0.4 }}
                                          className="text-white/70 text-base font-medium"
                                    >
                                          {athlete.sport_display}
                                    </motion.p>
                              </div>
                        </div>

                        <div className="grid grid-cols-4 gap-3 px-6 -mt-8 relative z-10">
                              {[
                                    { label: '나이', value: age ?? '—' },
                                    { label: '종목', value: shortDiscipline(athlete.sport_display) || athlete.sport_display || '—' },
                                    { label: '최근 순위', value: currentRank ? `#${currentRank}` : '—' },
                                    { label: 'FIS 점수', value: typeof latestPoints === 'number' ? latestPoints.toFixed(1) : '—' }
                              ].map((item, idx) => (
                                    <motion.div
                                          key={idx}
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.3 + idx * 0.1 }}
                                          className="glass-card rounded-xl p-3 flex flex-col items-center justify-center shadow-lg"
                                    >
                                          <span className="text-white/40 text-[9px] uppercase font-bold tracking-tighter mb-1">{item.label}</span>
                                          <span className="text-sm font-bold text-center leading-tight">{item.value}</span>
                                    </motion.div>
                              ))}
                        </div>

                        <section className="px-6 mt-10 space-y-6">
                              <h2 className="text-lg font-bold tracking-tight border-l-4 border-[var(--primary)] pl-4 uppercase italic">
                                    Recent Ranking Trend
                              </h2>
                              <div className="glass-card p-5">
                                    {trendRanks.length ? (
                                          <svg viewBox="0 0 240 80" className="w-full h-20">
                                                <path d={buildLinePath(trendRanks, 240, 80)} stroke="var(--primary)" strokeWidth="3" fill="none" strokeLinecap="round" />
                                          </svg>
                                    ) : (
                                          <div className="text-sm text-gray-500 text-center py-4">No trend data</div>
                                    )}
                                    <div className="flex justify-between text-[10px] text-gray-500 uppercase mt-2">
                                          <span>Best Rank: {bestRank ? `#${bestRank}` : '—'}</span>
                                          <span>Season Starts: {athlete.season_starts ?? '—'}</span>
                                    </div>
                              </div>
                        </section>

                        <section className="px-6 mt-10 pb-24 space-y-4">
                              <h2 className="text-lg font-bold tracking-tight border-l-4 border-[var(--primary)] pl-4 uppercase italic">
                                    Recent Results
                              </h2>
                              <div className="space-y-3">
                                    {recentResults.length ? recentResults.map((r: any, idx: number) => (
                                          <div key={idx} className="glass-card p-4 rounded-2xl">
                                                <div className="flex items-center justify-between">
                                                      <div className="min-w-0">
                                                            <p className="text-sm font-bold text-white truncate">{r.place || '—'}</p>
                                                            <p className="text-[10px] text-gray-500 uppercase">
                                                                  {formatDate(r.date)} · {r.nation || athlete.team}
                                                            </p>
                                                      </div>
                                                      <div className="text-right">
                                                            <p className="text-xs text-gray-500 uppercase">Rank</p>
                                                            <p className="text-base font-bold">{r.rank ? `#${r.rank}` : (r.rank_status || 'DNS/DNF')}</p>
                                                      </div>
                                                </div>
                                                <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400 uppercase">
                                                      <span>{shortDiscipline(r.discipline || r.category)}</span>
                                                      <span>FIS {typeof r.points === 'number' ? r.points.toFixed(2) : '—'} · CUP {typeof r.cup_points === 'number' ? r.cup_points.toFixed(0) : '—'}</span>
                                                </div>
                                          </div>
                                    )) : (
                                          <div className="text-sm text-gray-500 text-center py-4">No recent results</div>
                                    )}
                              </div>
                        </section>
                  </main>
            </div>
      );
};
