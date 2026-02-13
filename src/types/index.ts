export interface Athlete {
      id?: string;
      name_ko: string;
      name_en?: string;
      birth_date?: string;
      birth_year?: number;
      age?: number;
      gender?: 'M' | 'F';
      sport: string;
      sport_display?: string;
      team: string;
      fis_code: string;
      fis_url?: string;
      current_rank?: number | null;
      best_rank?: number | null;
      season_starts?: number;
      medals?: {
            gold: number;
            silver: number;
            bronze: number;
      };
      recent_results?: {
            date: string;
            event: string;
            rank: number;
            points: number;
      }[];
}

export interface AthletesData {
      athletes: Athlete[];
}
