export interface SportsResult {
  id: number;
  sport: string;
  category: string;
  country: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: Date; // Or Date type if preferred for date operations
}