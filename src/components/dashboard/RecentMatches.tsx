import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Athlete } from '../../types';

interface Props {
      athletes: Athlete[];
}

export const RecentMatches = ({ athletes }: Props) => {
      const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
      const navigate = useNavigate();

      // Mock recent matches data derived from athletes (in real app, this would be a separate API call or processed list)
      const recentMatches = athletes.slice(0, 4).map(athlete => ({
            athlete,
            date: '2026.02.15', // Mock date
            event: 'World Cup Finals',
            rank: athlete.current_rank ? `${athlete.current_rank}th` : 'Finalist',
            location: 'Milan, Italy'
      }));

      const handleProfileClick = () => {
            if (selectedAthlete) {
                  // Use ID or FIS Code as the identifier
                  const id = selectedAthlete.id || selectedAthlete.fis_code;
                  navigate(`/profile/${id}`);
            }
      };

      return (
            <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recentMatches.map((match, idx) => (
                              <motion.div
                                    key={`${match.athlete.id}-${idx}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => setSelectedAthlete(match.athlete)}
                                    className="glass-card p-5 cursor-pointer hover:bg-white/5 flex items-center justify-between group"
                              >
                                    <div className="flex items-center gap-4">
                                          {/* Date Badge */}
                                          <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-white/5 border border-white/10">
                                                <span className="text-[10px] text-gray-400 font-mono">FEB</span>
                                                <span className="text-lg font-bold text-white">15</span>
                                          </div>

                                          {/* Info */}
                                          <div>
                                                <h4 className="font-bold text-white group-hover:text-korea-red transition-colors">
                                                      {match.athlete.name_en}
                                                </h4>
                                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                                      <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{match.athlete.sport}</span>
                                                      <span>•</span>
                                                      <span>{match.event}</span>
                                                </div>
                                          </div>
                                    </div>

                                    <div className="text-right">
                                          <span className="block font-mono font-bold text-lg text-white">{match.rank}</span>
                                          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Rank</span>
                                    </div>
                              </motion.div>
                        ))}
                  </div>

                  {/* Athlete Modal */}
                  <AnimatePresence>
                        {selectedAthlete && (
                              <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                                    <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          onClick={() => setSelectedAthlete(null)}
                                          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                    />
                                    <motion.div
                                          initial={{ scale: 0.9, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          exit={{ scale: 0.9, opacity: 0 }}
                                          className="relative w-full max-w-lg glass-card p-8 shadow-2xl border-white/20 bg-[#0a0a0b]"
                                    >
                                          <button
                                                onClick={() => setSelectedAthlete(null)}
                                                className="absolute top-4 right-4 text-gray-500 hover:text-white"
                                          >
                                                ✕
                                          </button>

                                          <div className="text-center mb-8">
                                                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-800 to-black rounded-full mb-4 flex items-center justify-center text-3xl shadow-lg border border-white/10">
                                                      {selectedAthlete.name_en?.charAt(0)}
                                                </div>
                                                <h2 className="text-2xl font-display font-bold text-white">{selectedAthlete.name_en}</h2>
                                                <p className="text-korea-red font-medium">{selectedAthlete.sport}</p>
                                          </div>

                                          <div className="grid grid-cols-2 gap-4 mb-8">
                                                <div className="bg-white/5 p-4 rounded-xl text-center">
                                                      <span className="block text-gray-500 text-xs uppercase mb-1">Rank</span>
                                                      <span className="text-xl font-mono font-bold">{selectedAthlete.current_rank || '-'}</span>
                                                </div>
                                                <div className="bg-white/5 p-4 rounded-xl text-center">
                                                      <span className="block text-gray-500 text-xs uppercase mb-1">Age</span>
                                                      <span className="text-xl font-mono font-bold">
                                                            {selectedAthlete.birth_year ? (2026 - selectedAthlete.birth_year) : '-'}
                                                      </span>
                                                </div>
                                          </div>

                                          <button
                                                onClick={handleProfileClick}
                                                className="w-full btn-primary flex items-center justify-center gap-2 group"
                                          >
                                                <span className="font-bold">VIEW FULL PROFILE</span>
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                          </button>
                                    </motion.div>
                              </div>
                        )}
                  </AnimatePresence>
            </>
      );
};
