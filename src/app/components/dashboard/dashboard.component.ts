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
    <!-- Hero section con imagen de fondo y texto -->
    <section class="hero-section">
      <div class="overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">EXCITING GAMES</h1>
        <p class="hero-subtitle">Season starting on 2022 Aug. Hurry up and get your tickets today</p>
        <button class="btn btn-primary btn-lg mt-3">Purchase Tickets</button>
      </div>
      <div class="sponsor-bar">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-3 col-6 text-center">
              <div class="sponsor-icon">🏆</div>
              <div class="sponsor-text">DIGITAL TECH</div>
            </div>
            <div class="col-md-3 col-6 text-center">
              <div class="sponsor-icon">🛡️</div>
              <div class="sponsor-text">SECURITY</div>
            </div>
            <div class="col-md-3 col-6 text-center">
              <div class="sponsor-icon">🔄</div>
              <div class="sponsor-text">TECHNOLOGY</div>
            </div>
            <div class="col-md-3 col-6 text-center">
              <div class="sponsor-icon">⚽</div>
              <div class="sponsor-text">COMPETITION</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contenido principal -->
    <div class="container mt-5">
      <h2 class="section-title">UPCOMING MATCHES</h2>
      <div class="row mt-4">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-hover match-table">
              <thead class="table-dark">
                <tr>
                  <th>Date</th>
                  <th>League</th>
                  <th>Home Team</th>
                  <th></th>
                  <th>Away Team</th>
                  <th>Stadium</th>
                </tr>
              </thead>
              <tbody>
                @for (result of sportsResults(); track result.id) {
                  <tr>
                    <td>{{ result.date | date:'MMM d, y' }}</td>
                    <td>{{ result.league }}</td>
                    <td class="text-end">{{ result.homeTeam }}</td>
                    <td class="text-center">vs</td>
                    <td>{{ result.awayTeam }}</td>
                    <td>{{ result.country }} Stadium</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h2 class="section-title mt-5">TEAM STATISTICS</h2>
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="stats-card">
            <h3>Performance by Category</h3>
            <canvas
              baseChart
              [datasets]="barChartData.datasets"
              [labels]="barChartData.labels"
              [options]="barChartOptions"
              [type]="'bar'"
            ></canvas>
          </div>
        </div>
        <div class="col-md-6">
          <div class="stats-card">
            <h3>Distribution by Category</h3>
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
    </div>
  `,
  styles: [
    `/* Dashboard specific styles */
    :host {
      display: block;
      font-family: 'Arial', sans-serif;
      color: #333;
      background-color: #f8f9fa;
    }

    /* Navbar is now handled by navbar.component.ts */

    /* Hero section styles */
    .hero-section {
      position: relative;
      height: 600px;
      background-image: url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
      background-size: cover;
      background-position: center;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-top: 0;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      padding: 20px;
    }

    .hero-title {
      font-size: 5rem;
      font-weight: bold;
      margin-bottom: 20px;
      letter-spacing: 3px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    .hero-subtitle {
      font-size: 1.5rem;
      margin-bottom: 30px;
    }

    /* Sponsor bar styles */
    .sponsor-bar {
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: rgba(0,0,0,0.7);
      padding: 20px 0;
      z-index: 1;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .sponsor-icon {
      font-size: 28px;
      margin-bottom: 8px;
    }

    .sponsor-text {
      font-size: 11px;
      color: #ccc;
      letter-spacing: 1px;
      font-weight: 600;
    }

    /* Section titles */
    .section-title {
      font-size: 2.2rem;
      font-weight: bold;
      margin-bottom: 20px;
      color: #003366;
      border-bottom: 2px solid #003366;
      padding-bottom: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    /* Match table styles */
    .match-table {
      border-collapse: separate;
      border-spacing: 0 8px;
    }

    .match-table thead th {
      background-color: #003366;
      color: white;
      border: none;
      padding: 15px 20px;
      text-transform: uppercase;
      font-size: 0.9rem;
      letter-spacing: 1px;
    }

    .match-table thead th:first-child {
      border-radius: 5px 0 0 5px;
    }

    .match-table thead th:last-child {
      border-radius: 0 5px 5px 0;
    }

    .match-table tbody tr {
      background-color: white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      border-radius: 5px;
    }

    .match-table tbody tr:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      background-color: #f8f9fa;
    }

    .match-table td {
      padding: 12px 15px;
      border: none;
      vertical-align: middle;
    }

    /* Stats card styles */
    .stats-card {
      background-color: white;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      height: 100%;
      transition: transform 0.3s ease;
    }
    
    .stats-card:hover {
      transform: translateY(-5px);
    }

    .stats-card h3 {
      color: #003366;
      margin-bottom: 20px;
      font-size: 1.6rem;
      border-bottom: 2px solid #eee;
      padding-bottom: 12px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* Styling for charts */
    canvas {
      max-width: 100%;
      height: auto !important;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 3rem;
      }
      .hero-subtitle {
        font-size: 1.2rem;
      }
      .hero-section {
        height: 500px;
      }
      .sponsor-bar {
        padding: 15px 0;
      }
      .sponsor-icon {
        font-size: 22px;
      }
      .sponsor-text {
        font-size: 10px;
      }
      .section-title {
        font-size: 1.8rem;
      }
    }
    
    @media (max-width: 576px) {
      .hero-title {
        font-size: 2.5rem;
      }
      .hero-section {
        height: 400px;
      }
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