import { Hero } from '../components/dashboard/HeroSection';
import { PerformanceAnalysis } from '../components/dashboard/PerformanceAnalysis';
import { useAthletes } from '../hooks/useAthletes';

export const DashboardPage = () => {
      const { stats } = useAthletes();
      return (
            <div className="min-h-screen bg-[#050505] text-white selection:bg-korea-red selection:text-white pb-32">
                  <header className="fixed top-0 left-0 right-0 z-50 p-4 max-w-[480px] mx-auto bg-transparent">
                        <div className="flex items-center justify-between">
                              <span className="font-black italic text-xl tracking-tighter">TEAM <span className="text-[var(--primary)]">KOREA</span></span>
                              <div className="flex gap-2">
                                    <div className="size-2 rounded-full bg-[var(--primary)] shadow-[0_0_10px_rgba(255,70,70,0.5)]"></div>
                                    <div className="size-2 rounded-full bg-[var(--secondary)]"></div>
                              </div>
                        </div>
                  </header>

                  <main className="relative z-10 max-w-[480px] mx-auto bg-[#0a0a0a] min-h-screen shadow-2xl">
                        <Hero totalAthletes={stats?.total_athletes} openingDate="2026-02-06" />

                        {/* V3 Performance Analysis Section */}
                        <PerformanceAnalysis stats={stats} />
                  </main>

                  {/* Footer */}
                  <footer className="py-12 bg-black/40 backdrop-blur-lg max-w-[480px] mx-auto border-t border-white/5">
                        <div className="px-10 text-center text-gray-600 font-bold uppercase tracking-[0.2em] text-[8px]">
                              <p>© 2026 TEAM KOREA WINTER OLYMPICS</p>
                              <p className="mt-2 text-gray-800">OFFICIAL DASHBOARD SERVICE</p>
                        </div>
                  </footer>
            </div>
      );
};
