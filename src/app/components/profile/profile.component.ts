import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <h2>User Profile</h2>
      <div *ngIf="userProfile">
        <p><strong>Name:</strong> {{ userProfile.name }}</p>
        <p><strong>Email:</strong> {{ userProfile.email }}</p>
        <p><strong>Member Since:</strong> {{ userProfile.memberSince | date }}</p>
        <p><strong>Total Bets:</strong> {{ userProfile.totalBets }}</p>
        <p><strong>Favorite Sport:</strong> {{ userProfile.favoriteSport }}</p>
      </div>
      <div *ngIf="!userProfile">
        <p>Loading profile data...</p>
      </div>
    </div>
  `,
  styles: [
    `
    .profile-container {
      background-color: #e0f7fa; /* Light cyan */
      color: #004d40; /* Dark cyan */
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
    }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: new Date('2023-01-15'),
    totalBets: 150,
    favoriteSport: 'Football'
  };

}