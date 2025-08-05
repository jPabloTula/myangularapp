import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-paises',
 standalone: true,
 imports: [CommonModule],
 template: `
    <div class="container mt-4">
      <h1>Paises Page</h1>
 <ul class="country-list">
 @for (country of countries; track country) {
 <li class="country-item">{{ country }}</li>
 }
 </ul>
    </div>
 `,
 styles: [`
 :host {
 display: block;
 background-color: #e0f7fa; /* Light cyan background */
 padding: 20px;
 color: #004d40; /* Dark teal text */
 }
 .country-list {
 list-style: none;
 padding: 0;
 }
 .country-item {
 background-color: #b2ebf2; /* Cyan lighten-4 */
 margin-bottom: 5px;
 padding: 10px;
 border-radius: 4px;
 }
 `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaisesComponent {
  countries = ['USA', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Spain', 'France', 'Germany', 'Italy', 'UK'];
}