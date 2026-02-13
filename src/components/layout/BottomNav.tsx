import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Trophy, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const BottomNav = () => {
      const navigate = useNavigate();
      const location = useLocation();

      const navItems = [
            { id: 'dashboard', label: 'DASHBOARD', icon: LayoutGrid, path: '/' },
            { id: 'results', label: 'RESULTS', icon: Trophy, path: '/results' },
            { id: 'athletes', label: 'ATHLETES', icon: User, path: '/athletes' }
      ];

      return (
            <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe max-w-[480px] mx-auto">
                  <div className="mx-6 mb-6 glass-card rounded-2xl flex justify-between items-center py-3 px-8 shadow-2xl border-white/10">
                        {navItems.map((item) => {
                              const isActive = location.pathname === item.path || (item.id === 'athletes' && location.pathname.startsWith('/profile'));
                              const Icon = item.icon;

                              return (
                                    <button
                                          key={item.id}
                                          onClick={() => navigate(item.path)}
                                          className="flex flex-col items-center gap-1 group relative"
                                    >
                                          <Icon
                                                size={20}
                                                className={`transition-all duration-300 ${isActive ? 'text-[var(--primary)]' : 'text-gray-500 group-hover:text-gray-300'}`}
                                                fill={isActive ? "currentColor" : "none"}
                                                fillOpacity={0.2}
                                          />
                                          <span className={`text-[9px] font-black tracking-widest transition-all duration-300 ${isActive ? 'text-[var(--primary)]' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                                {item.label}
                                          </span>
                                          {isActive && (
                                                <motion.div
                                                      layoutId="nav-active"
                                                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-[var(--primary)]"
                                                />
                                          )}
                                    </button>
                              );
                        })}
                  </div>
            </nav>
      );
};
