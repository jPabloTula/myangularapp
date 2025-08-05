import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsResult } from '../../models/sports-result';
import { BettingStatsService } from '../../services/betting-stats.service';
import { take } from 'rxjs';
import { BettingStats } from '../../models/betting-stats';
import { Chart, LinearScale, CategoryScale, BarController, DoughnutController, ArcElement, Tooltip, Legend, BarElement } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SportsDataService } from '../../services/sports-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  // Removed SportsDataService from providers array as it's provided in root
  template: `
    <div class="container mt-4">
      <h1>Bienvenido, Usuario</h1>


      <h2 class="mt-4">Latest Sports Results</h2>
      <table class="table table-striped table-bordered table-hover mt-3">
        <thead>
 
            <tr>
            <th>Sport</th>
            <th>Country</th>
            <th>League</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Home Score</th>
            <th>Away Score</th>
            <th>Date</th>
          </tr>
        </thead>
 <tbody>
 @for (result of sportsResults(); track result.id) {
 <tr>
 <td>{{ result.sport }}</td>
 <td>{{ result.country }}</td>
 <td>{{ result.league }}</td>
 <td>{{ result.homeTeam }}</td>
 <td>{{ result.awayTeam }}</td>
 <td>{{ result.homeScore }}</td>
 <td>{{ result.awayScore }}</td>
 <td>{{ result.date | date }}</td>
            </tr>
          }
        </tbody>
 </table>

      <h2 class="mt-4">Betting Statistics</h2>

      <div class="row mt-4">
        <div class="col-md-6">
          <h3>Total Bets by Category</h3>
          <canvas
            baseChart
            [datasets]="barChartData.datasets"
            [labels]="barChartData.labels"
            [options]="barChartOptions"
            [type]="'bar'"
          ></canvas>

        </div>
        <div class="col-md-6">
          <h3>Total Bets Distribution</h3>
          <canvas
            baseChart
            [datasets]="donutChartData.datasets"
            [labels]="donutChartData.labels"
            [options]="donutChartOptions"
            [type]="'doughnut'"
          ></canvas>
        </div>
      </div>
    </div>
  `,
  styles: [
    `/* Dashboard specific styles */
    :host {
 display: block; /* Make the component a block element */
 padding: 20px;
      background-color: #f8f9fa; /* Light gray background */
 color: #333; /* Dark gray text */
    }
 table {
      background-color: #fff; /* White background for tables */
 }

    /* Styling for charts */
    canvas {
      max-width: 100%; /* Make charts responsive within their containers */
 height: auto !important; /* Allow height to adjust based on width */
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  // Inject the SportsDataService (it's provided in 'root')
  private sportsDataService = inject(SportsDataService);
  private bettingStatsService = inject(BettingStatsService);

  // Dummy data for sports results
  sportsResults = signal<SportsResult[]>([]);

  // Dummy data for betting statistics
  bettingStats = signal<BettingStats[]>([]);


  // Placeholder properties for chart data and options
  public barChartData: any;
  datasets: [{ data: []; label: 'Total Bets'; }] | undefined

  public barChartOptions: any = {
    responsive: true, // Make chart responsive
    scales: {
      y: {
        beginAtZero: true // Start y-axis at zero
      }
    }
  };

  public donutChartData: any = {
    labels: [],
    datasets: [{ data: [] }]
  };

  public donutChartOptions: any = {
    responsive: true, // Make chart responsive
  };

  constructor()
  {
    // Initialize sportsResults with some dummy data if needed, otherwise it remains empty based on the signal() initialization.
    this.sportsResults.set(this.sportsDataService.mockSportsResults);

    // Initialize bettingStats with some dummy data
    this.bettingStats.set(this.bettingStatsService.mockStats);
    Chart.register(
      LinearScale,
      CategoryScale,
      BarController,
      DoughnutController,
      BarElement, // Register BarElement
      ArcElement,

      Tooltip,
      Legend
    );

    // Process dummy data for charts
    const categories = this.bettingStats().map(stat => stat.category);
    const totalBets = this.bettingStats().map(stat => stat.totalBets);

    this.barChartData = {
      labels: categories,
      datasets: [{
        data: totalBets, label: 'Total Bets', backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ]
      }]
    };

    this.donutChartData = {
      labels: categories, datasets: [{ data: totalBets, backgroundColor: this.barChartData.datasets[0].backgroundColor }]
    };
  }
}