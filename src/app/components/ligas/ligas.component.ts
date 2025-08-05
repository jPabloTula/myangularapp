import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ligas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Available Leagues</h2>
      <ul class="league-list">
        @for (league of leagues; track league.id) {
          <li class="league-item">
            {{ league.name }} ({{ league.country }})
          </li>
        }
      </ul>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
        background-color: #e0f7fa; /* Light cyan background */
        color: #004d40; /* Dark teal text */
        min-height: 100vh;
      }
      .league-list {
        list-style: none;
        padding: 0;
      }
      .league-item {
        background-color: #b2ebf2; /* Lighter cyan */
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LigasComponent {
  leagues = [
    { id: 1, name: 'Premier League', country: 'England' },
    { id: 2, name: 'La Liga', country: 'Spain' },
    { id: 3, name: 'Bundesliga', country: 'Germany' },
    { id: 4, name: 'Serie A', country: 'Italy' },
    { id: 5, name: 'Ligue 1', country: 'France' }
  ];
}