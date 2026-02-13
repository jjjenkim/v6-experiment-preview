/**
 * Custom hook to load and manage athlete data.
 * Simulates an API call by importing the JSON directly.
 */
import { useState, useEffect } from 'react';
import type { Athlete } from '../types';
import athleteData from '../data/athletes.json';

export const useAthletes = () => {
      const [athletes, setAthletes] = useState<Athlete[]>([]);
      const [loading, setLoading] = useState(true);
      const [lastUpdated, setLastUpdated] = useState<string>('');

      const [stats, setStats] = useState<any>(null);

      useEffect(() => {
            // Simulate network delay using setTimeout
            const timer = setTimeout(() => {
                  // @ts-ignore
                  const rawAthletes = athleteData.athletes as Athlete[];
                  setAthletes(rawAthletes);
                  // @ts-ignore
                  setLastUpdated(athleteData.metadata?.last_updated || new Date().toISOString());

                  // Calculate Stats
                  const bySport = rawAthletes.reduce((acc: any, curr) => {
                        const sport = curr.sport_display || curr.sport;
                        acc[sport] = (acc[sport] || 0) + 1;
                        return acc;
                  }, {});

                  const sportSplit = rawAthletes.reduce((acc: any, curr) => {
                        const sport = (curr.sport || '').toLowerCase();
                        if (sport.includes('snowboard')) acc.snowboard++;
                        else if (sport.includes('ski')) acc.ski++;
                        else acc.other++;
                        return acc;
                  }, { ski: 0, snowboard: 0, other: 0 });

                  const byTeam = rawAthletes.reduce((acc: any, curr) => {
                        let team = 'Ski';
                        if ((curr.sport || '').toLowerCase().includes('snowboard')) team = 'Snowboard';
                        else if ((curr.sport || '').toLowerCase().includes('skating')) team = 'Skating';
                        else if ((curr.sport || '').toLowerCase().includes('ice')) team = 'Ice';

                        acc[team] = (acc[team] || 0) + 1;
                        return acc;
                  }, {});

                  const ageDistribution = rawAthletes.reduce((acc: any, curr) => {
                        if (!curr.birth_date) return acc;
                        const year = parseInt(curr.birth_date.split('-')[0]);
                        const age = 2026 - year;

                        if (age < 20) acc.teens++;
                        else if (age < 30) acc.twenties++;
                        else acc.thirties++;
                        return acc;
                  }, { teens: 0, twenties: 0, thirties: 0 });

                  const allResults = rawAthletes.flatMap((athlete) =>
                        (athlete.recent_results || []).map((r: any) => ({
                              ...r,
                              athlete
                        }))
                  );

                  const resourceMap = new Map<string, { sum: number; count: number }>();
                  allResults.forEach((r: any) => {
                        if (typeof r.points !== 'number') return;
                        const sport = r.athlete?.sport_display || r.athlete?.sport || 'Unknown';
                        const curr = resourceMap.get(sport) || { sum: 0, count: 0 };
                        curr.sum += r.points;
                        curr.count += 1;
                        resourceMap.set(sport, curr);
                  });

                  const resourceAllocation = Array.from(resourceMap.entries()).map(([sport, val]) => ({
                        sport,
                        avg_fis_points: val.count ? val.sum / val.count : 0
                  })).sort((a, b) => b.avg_fis_points - a.avg_fis_points);

                  const momentumMap = new Map<string, { sum: number; count: number }>();
                  allResults.forEach((r: any) => {
                        if (!r.date || typeof r.rank !== 'number' || r.rank <= 0) return;
                        const ym = r.date.slice(0, 7);
                        const curr = momentumMap.get(ym) || { sum: 0, count: 0 };
                        curr.sum += r.rank;
                        curr.count += 1;
                        momentumMap.set(ym, curr);
                  });

                  const successMomentum = Array.from(momentumMap.entries())
                        .map(([ym, val]) => ({ label: ym, value: val.count ? val.sum / val.count : 0 }))
                        .sort((a, b) => a.label.localeCompare(b.label))
                        .slice(-6);

                  const ageVsRank = rawAthletes
                        .filter(a => a.age && a.current_rank && a.current_rank > 0)
                        .map(a => ({ age: a.age as number, rank: a.current_rank as number }));

                  const teamComposition = Object.entries(bySport).map(([sport, count]) => ({
                        sport,
                        count: count as number
                  })).sort((a, b) => b.count - a.count);

                  const newStats = {
                        total_athletes: rawAthletes.length,
                        by_sport: bySport,
                        by_team: byTeam,
                        age_distribution: ageDistribution,
                        sport_split: sportSplit,
                        resource_allocation: resourceAllocation,
                        success_momentum: successMomentum,
                        age_vs_rank: ageVsRank,
                        team_composition: teamComposition
                  };
                  setStats(newStats);

                  setLoading(false);
            }, 800);

            return () => clearTimeout(timer);
      }, []);

      const getMedalists = () => {
            return athletes.filter(a =>
                  (a.medals?.gold || 0) + (a.medals?.silver || 0) + (a.medals?.bronze || 0) > 0
            );
      };

      const getTopRankers = (limit = 5) => {
            return [...athletes]
                  .filter(a => a.current_rank)
                  .sort((a, b) => (a.current_rank || 999) - (b.current_rank || 999))
                  .slice(0, limit);
      };

      return {
            athletes,
            stats,
            loading,
            lastUpdated,
            getMedalists,
            getTopRankers
      };
};
