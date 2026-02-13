import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Athlete } from '../../types';
import { Medal } from 'lucide-react';
import clsx from 'clsx';

interface Props {
      athlete: Athlete;
      index: number;
      onClick?: () => void;
}

export const AthleteCard = ({ athlete, index, onClick }: Props) => {
      const hasMedal = (athlete.medals?.gold || 0) + (athlete.medals?.silver || 0) + (athlete.medals?.bronze || 0) > 0;

      const x = useMotionValue(0);
      const y = useMotionValue(0);

      const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
      const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

      const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
      const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

      const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const xPct = mouseX / width - 0.5;
            const yPct = mouseY / height - 0.5;
            x.set(xPct);
            y.set(yPct);
      };

      const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
      };

      return (
            <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  style={{
                        perspective: 1000,
                  }}
                  className="h-full"
            >
                  <motion.div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        onClick={onClick}
                        role="button"
                        tabIndex={0}
                        style={{
                              rotateX,
                              rotateY,
                              transformStyle: "preserve-3d",
                        }}
                        className={clsx(
                              "h-full relative overflow-hidden glass-card p-6 group cursor-pointer",
                              hasMedal
                                    ? "bg-gradient-to-br from-korea-blue/30 to-slate-900/80 border-gold/30 shadow-[0_0_30px_rgba(255,215,0,0.1)]"
                                    : "hover:bg-white/10"
                        )}
                  >
                        {/* Spotlight Effect */}
                        <div
                              className="absolute -top-[100px] -left-[100px] w-[200px] h-[200px] bg-white/5 blur-[50px] group-hover:bg-white/10 transition-colors pointer-events-none"
                              style={{ transform: "translateZ(0)" }}
                        />

                        {/* Content Container with depth */}
                        <div style={{ transform: "translateZ(20px)" }}>
                              {/* Header */}
                              <div className="relative z-10 flex justify-between items-start mb-4">
                                    <div>
                                          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                                                {athlete.sport_display || athlete.sport}
                                          </span>
                                          <h3 className="text-xl font-bold text-white mt-1 group-hover:text-glow transition-all">
                                                {athlete.name_ko}
                                          </h3>
                                          <p className="text-sm text-gray-500 font-medium truncate">{athlete.name_en}</p>
                                    </div>
                                    {hasMedal && (
                                          <div className="bg-gold/10 p-2 rounded-full border border-gold/20 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                                                <Medal className="w-5 h-5 text-gold" />
                                          </div>
                                    )}
                              </div>

                              {/* Stats Grid */}
                              <div className="relative z-10 grid grid-cols-2 gap-4 mt-8">
                                    <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                                          <p className="text-xs text-gray-500 mb-1">Current Rank</p>
                                          <p className="text-lg font-mono font-bold text-white">
                                                {athlete.current_rank ? `#${athlete.current_rank}` : '-'}
                                          </p>
                                    </div>
                                    <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                                          <p className="text-xs text-gray-500 mb-1">Medals</p>
                                          <div className="flex gap-2">
                                                {athlete.medals?.gold ? <span className="text-amber-400 text-sm">🥇{athlete.medals.gold}</span> : null}
                                                {athlete.medals?.silver ? <span className="text-slate-400 text-sm">🥈{athlete.medals.silver}</span> : null}
                                                {athlete.medals?.bronze ? <span className="text-orange-400 text-sm">🥉{athlete.medals.bronze}</span> : null}
                                                {!hasMedal && <span className="text-gray-600 text-sm">-</span>}
                                          </div>
                                    </div>
                              </div>

                              {/* Decorative Corner */}
                              <div className="absolute bottom-4 right-4 text-xs font-mono text-gray-700 opacity-50">
                                    {athlete.fis_code}
                              </div>
                        </div>
                  </motion.div>
            </motion.div>
      );
};
