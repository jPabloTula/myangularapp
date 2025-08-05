import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BettingStats } from '../models/betting-stats';

@Injectable({
  providedIn: 'root'
})
export class BettingStatsService {

  public mockStats: BettingStats[] = [
    { category: 'Fútbol', country: 'España', totalBets: 15000, averageBetAmount: 15.5, mostPopularBetType: 'Resultado Final' },
    { category: 'Baloncesto', country: 'USA', totalBets: 8000, averageBetAmount: 22.0, mostPopularBetType: 'Puntos Totales' },
    { category: 'Tenis', country: 'Internacional', totalBets: 5000, averageBetAmount: 10.0, mostPopularBetType: 'Ganador del Partido' },
    { category: 'Fútbol', country: 'Inglaterra', totalBets: 12000, averageBetAmount: 18.0, mostPopularBetType: 'Primer Goleador' },
    { category: 'Baloncesto', country: 'España', totalBets: 4000, averageBetAmount: 19.5, mostPopularBetType: 'Hándicap' },
  ];

  constructor() { }

  /**
   * Simulates fetching betting statistics data.
   * @returns An Observable of an array of mock BettingStats objects.
   */
  getBettingStats(): Observable<BettingStats[]> {
    return of(this.mockStats);
  }
}