import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deportes',
  standalone: true,
  template: `
  <div class="sports-list">
    @for (sport of sports; track sport.id) {
      <div class="sport-card">
        <h2>{{ sport.name }}</h2>
        <p>{{ sport.description }}</p>
      </div>
    }
  </div>
  `,
  styles: [
    `
      .container {
        background-color: #f0f8ff; /* Light blue */
        padding: 20px;
        border-radius: 8px;
      }

      h1 {
        color: #333;
        text-align: center;
        margin-bottom: 20px;
      }

      .sports-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
      }

      .sport-card {
        background-color: #fff;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      .sport-card h2 {
        color: #1a73e8; /* Blue */
        margin-top: 0;
      }

      .sport-card p {
        color: #555;
        font-size: 0.9em;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeportesComponent {
  sports = [
    { id: 1, name: 'Football', description: 'Popular sport played with a ball.' },
    { id: 2, name: 'Basketball', description: 'Team sport played with a ball on a court.' },
    { id: 3, name: 'Tennis', description: 'Individual or doubles sport played with rackets.' },
    { id: 4, name: 'Esports', description: 'Competitive video gaming.' },
    { id: 5, name: 'Baseball', description: 'Bat-and-ball game played between two teams.' },
  ];
}