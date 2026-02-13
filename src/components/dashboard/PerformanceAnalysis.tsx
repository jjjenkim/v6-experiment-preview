import { motion } from 'framer-motion';

interface Props {
      stats: any;
}

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

export const PerformanceAnalysis = ({ stats }: Props) => {
      if (!stats) return null;

      const total = stats.total_athletes || 0;
      const split = stats.sport_split || { ski: 0, snowboard: 0, other: 0 };
      const skiPct = total ? Math.round((split.ski / total) * 100) : 0;

      const resource = (stats.resource_allocation || []).slice(0, 7);
      const resourceMax = resource.length ? Math.max(...resource.map((r: any) => r.avg_fis_points)) : 0;

      const momentum = (stats.success_momentum || []).map((m: any) => m.value);
      const ageVsRank = stats.age_vs_rank || [];
      const teamComp = (stats.team_composition || []).slice(0, 6);
      const ageDist = stats.age_distribution || { teens: 0, twenties: 0, thirties: 0 };

      const ageMax = ageVsRank.length ? Math.max(...ageVsRank.map((d: any) => d.age)) : 40;
      const ageMin = ageVsRank.length ? Math.min(...ageVsRank.map((d: any) => d.age)) : 18;
      const rankMax = ageVsRank.length ? Math.max(...ageVsRank.map((d: any) => d.rank)) : 50;
      const rankMin = ageVsRank.length ? Math.min(...ageVsRank.map((d: any) => d.rank)) : 1;

      const ageDistMax = Math.max(ageDist.teens, ageDist.twenties, ageDist.thirties, 1);

      const ringRadius = 18;
      const ringCirc = 2 * Math.PI * ringRadius;
      const ringDash = (skiPct / 100) * ringCirc;

      return (
            <section className="px-6 space-y-6 w-full mx-auto">
                  <div className="flex items-center justify-between mt-8 mb-2 px-1">
                        <h3 className="font-black text-lg tracking-tight uppercase italic">Performance Analysis</h3>
                        <span className="bg-secondary/10 text-secondary text-[10px] font-black px-2 py-1 rounded-md">LIVE DATA</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                        <motion.div
                              initial={{ opacity: 0, scale: 0.96 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              className="glass-card p-4 flex flex-col justify-between min-h-[150px]"
                        >
                              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Squad Demographics</p>
                              <div className="relative flex items-center justify-center py-2">
                                    <svg className="w-20 h-20" viewBox="0 0 48 48">
                                          <circle cx="24" cy="24" r={ringRadius} stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
                                          <circle
                                                cx="24"
                                                cy="24"
                                                r={ringRadius}
                                                stroke="var(--primary)"
                                                strokeWidth="4"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeDasharray={`${ringDash} ${ringCirc - ringDash}`}
                                                transform="rotate(-90 24 24)"
                                          />
                                    </svg>
                                    <div className="absolute text-center">
                                          <div className="text-lg font-black">{total}</div>
                                          <div className="text-[9px] text-gray-400 uppercase">Athletes</div>
                                    </div>
                              </div>
                              <p className="text-[10px] text-center text-gray-400 font-medium">Ski {skiPct}% · Snowboard {100 - skiPct}%</p>
                        </motion.div>

                        <motion.div
                              initial={{ opacity: 0, scale: 0.96 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              className="glass-card p-4 flex flex-col justify-between min-h-[150px]"
                        >
                              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Resource Allocation</p>
                              <div className="space-y-2">
                                    {resource.map((r: any) => (
                                          <div key={r.sport} className="space-y-1">
                                                <div className="flex items-center justify-between text-[9px] text-gray-400 uppercase">
                                                      <span className="truncate">{r.sport}</span>
                                                      <span className="text-white/70">{r.avg_fis_points.toFixed(1)} PTS</span>
                                                </div>
                                                <div className="h-1.5 rounded-full bg-white/5">
                                                      <div
                                                            className="h-1.5 rounded-full bg-[var(--primary)]"
                                                            style={{ width: resourceMax ? `${(r.avg_fis_points / resourceMax) * 100}%` : '0%' }}
                                                      />
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </motion.div>

                        <motion.div
                              initial={{ opacity: 0, scale: 0.96 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              className="glass-card p-4 flex flex-col justify-between min-h-[150px]"
                        >
                              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Success Momentum</p>
                              <svg viewBox="0 0 140 60" className="w-full h-20">
                                    <path
                                          d={buildLinePath(momentum, 140, 60)}
                                          stroke="var(--primary)"
                                          strokeWidth="3"
                                          fill="none"
                                          strokeLinecap="round"
                                    />
                              </svg>
                              <p className="text-[10px] text-center text-gray-400 font-medium">Avg rank trend (recent 6)</p>
                        </motion.div>

                        <motion.div
                              initial={{ opacity: 0, scale: 0.96 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              className="glass-card p-4 flex flex-col justify-between min-h-[150px]"
                        >
                              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Age vs Rank Analysis</p>
                              <svg viewBox="0 0 140 60" className="w-full h-20">
                                    {ageVsRank.map((d: any, i: number) => {
                                          const x = ((d.age - ageMin) / (ageMax - ageMin || 1)) * 140;
                                          const y = 60 - ((d.rank - rankMin) / (rankMax - rankMin || 1)) * 60;
                                          return <circle key={i} cx={x} cy={y} r="2.2" fill="var(--primary)" opacity="0.8" />;
                                    })}
                              </svg>
                              <p className="text-[10px] text-center text-gray-400 font-medium">Lower rank = better</p>
                        </motion.div>

                        <motion.div
                              initial={{ opacity: 0, scale: 0.96 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              className="glass-card p-4 flex flex-col justify-between min-h-[150px]"
                        >
                              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Team Composition</p>
                              <div className="space-y-2">
                                    {teamComp.map((t: any) => (
                                          <div key={t.sport} className="space-y-1">
                                                <div className="flex items-center justify-between text-[9px] text-gray-400 uppercase">
                                                      <span className="truncate">{t.sport}</span>
                                                      <span className="text-white/70">{t.count}</span>
                                                </div>
                                                <div className="h-1.5 rounded-full bg-white/5">
                                                      <div
                                                            className="h-1.5 rounded-full bg-[var(--secondary)]"
                                                            style={{ width: teamComp[0] ? `${(t.count / teamComp[0].count) * 100}%` : '0%' }}
                                                      />
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </motion.div>

                        <motion.div
                              initial={{ opacity: 0, scale: 0.96 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              className="glass-card p-4 flex flex-col justify-between min-h-[150px]"
                        >
                              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Age Demographics</p>
                              <div className="flex items-end justify-around h-16">
                                    {[{ label: 'Teens', value: ageDist.teens }, { label: '20s', value: ageDist.twenties }, { label: '30s+', value: ageDist.thirties }].map((a) => (
                                          <div key={a.label} className="flex flex-col items-center gap-1">
                                                <div className="w-6 rounded-full bg-[var(--primary)]/70" style={{ height: `${(a.value / ageDistMax) * 60 || 4}px` }} />
                                                <span className="text-[9px] text-gray-500">{a.label}</span>
                                          </div>
                                    ))}
                              </div>
                        </motion.div>
                  </div>
            </section>
      );
};
