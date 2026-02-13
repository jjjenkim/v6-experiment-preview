import { useAthletes } from '../hooks/useAthletes';
import { AthleteCard } from '../components/common/AthleteCard';
import { useNavigate } from 'react-router-dom';

export const AthletesPage = () => {
      const { athletes } = useAthletes();
      const navigate = useNavigate();

      const groups = athletes.reduce((acc: Record<string, typeof athletes>, athlete) => {
            const key = athlete.sport_display || athlete.sport || 'Unknown';
            if (!acc[key]) acc[key] = [];
            acc[key].push(athlete);
            return acc;
      }, {});

      const entries = Object.entries(groups).sort((a, b) => b[1].length - a[1].length);

      return (
            <div className="min-h-screen bg-[#0a0a0a] text-white pb-32">
                  <main className="max-w-[480px] mx-auto px-6 py-8 space-y-10">
                        <header className="space-y-2">
                              <h1 className="text-2xl font-black italic tracking-tighter uppercase">선수단</h1>
                              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Team Korea Athletes</p>
                        </header>

                        {entries.map(([sport, list]) => (
                              <section key={sport} className="space-y-4">
                                    <div className="flex items-center justify-between">
                                          <h2 className="text-sm font-bold uppercase italic text-[var(--primary)]">{sport}</h2>
                                          <span className="text-[10px] text-gray-500 uppercase">{list.length} Athletes</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                          {list.map((athlete, idx) => (
                                                <AthleteCard
                                                      key={athlete.fis_code || athlete.id || `${sport}-${idx}`}
                                                      athlete={athlete}
                                                      index={idx}
                                                      onClick={() => navigate(`/profile/${athlete.id || athlete.fis_code}`)}
                                                />
                                          ))}
                                    </div>
                              </section>
                        ))}
                  </main>
            </div>
      );
};
