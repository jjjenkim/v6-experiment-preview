import { motion } from 'framer-motion';

interface Props {
      totalAthletes?: number;
      openingDate?: string;
}

const formatDday = (openingDate?: string) => {
      if (!openingDate) return 'D-';
      const target = new Date(openingDate);
      const now = new Date();
      const diffMs = target.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      if (Number.isNaN(diffDays)) return 'D-';
      return diffDays >= 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
};

export const Hero = ({ totalAthletes = 0, openingDate = '2026-02-06' }: Props) => {
      const dday = formatDday(openingDate);
      return (
            <header className="hero-gradient pt-16 pb-12 px-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <div className="text-[120px] font-black italic select-none">KR</div>
                  </div>

                  <div className="max-w-7xl mx-auto">
                        <div className="mb-12 text-center sm:text-left relative z-10">
                              <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-[10px] font-bold tracking-[0.4em] text-secondary mb-2 uppercase"
                              >
                                    Republic of Korea
                              </motion.h2>
                              <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="huge-title flex flex-col"
                              >
                                    <span>TEAM</span>
                                    <span className="text-[var(--primary)]">KOREA</span>
                              </motion.h1>
                              <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-[11px] font-medium tracking-[0.2em] text-gray-500 mt-6 uppercase"
                              >
                                    Elite Winter Sports Division
                              </motion.p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="glass-card px-8 py-5 flex-1 border-l-4 border-l-[var(--primary)]"
                              >
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Milano Cortina 2026</p>
                                    <div className="flex items-baseline gap-2">
                                          <span className="text-4xl font-black italic">{dday}</span>
                                          <span className="text-xs text-gray-500 font-medium tracking-tight">to opening</span>
                                    </div>
                              </motion.div>
                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="glass-card px-8 py-5 flex-1 border-l-4 border-l-[var(--secondary)]"
                              >
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Elite National Squad</p>
                                    <div className="flex items-baseline gap-2">
                                          <span className="text-4xl font-black italic">{totalAthletes || '—'}</span>
                                          <span className="text-xs text-gray-500 font-medium tracking-tight">Active Athletes</span>
                                    </div>
                              </motion.div>
                        </div>
                  </div>

                  {/* Background Ambience */}
                  <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            </header>
      );
};
