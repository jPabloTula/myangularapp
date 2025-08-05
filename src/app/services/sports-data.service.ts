import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SportsResult } from '../models/sports-result';

@Injectable({
  providedIn: 'root'
})
export class SportsDataService {

  public mockSportsResults: SportsResult[] = [
    {
      id: 1,
      sport: 'Fútbol',
      category: 'Liga',
      country: 'España',
      league: 'La Liga',
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      homeScore: 2,
      awayScore: 1,
      date: new Date('2023-11-10T18:00:00Z')
    },
    {
      id: 2,
      sport: 'Baloncesto',
      category: 'NBA',
      country: 'USA',
      league: 'Regular Season',
      homeTeam: 'Lakers',
      awayTeam: 'Celtics',
      homeScore: 115,
      awayScore: 112,
      date: new Date('2023-11-09T22:30:00Z')
    },
    {
      id: 3,
      sport: 'Fútbol',
      category: 'Liga',
      country: 'Inglaterra',
      league: 'Premier League',
      homeTeam: 'Manchester Utd',
      awayTeam: 'Liverpool',
      homeScore: 0,
      awayScore: 0,
      date: new Date('2023-11-11T15:00:00Z')
    },
    {
      id: 4,
      sport: 'Tenis',
      category: 'ATP',
      country: 'Australia',
      league: 'Australian Open',
      homeTeam: 'Djokovic',
      awayTeam: 'Nadal',
      homeScore: 0,
      awayScore: 0,
      date: new Date('2024-01-20T05:00:00Z')
    },
    {
      id: 5,
      sport: 'Fútbol',
      category: 'Copa',
      country: 'Italia',
      league: 'Coppa Italia',
      homeTeam: 'Juventus',
      awayTeam: 'Inter Milan',
      homeScore: 1,
      awayScore: 2,
      date: new Date('2023-11-08T20:45:00Z')
    }
  ];

  constructor() { }

  /**
   * Retrieves mock sports results data.
   * @returns An Observable of an array of SportsResult objects.
   */
  getSportsResults(): Observable<SportsResult[]> {
    return of(this.mockSportsResults);
  }
}