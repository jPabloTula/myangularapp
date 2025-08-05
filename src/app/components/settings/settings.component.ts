import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
    <h1>Settings Page</h1>

 <div class="settings-list">
 @for (setting of settings; track setting.id) {
 <div class="setting-item">
 <span>{{ setting.name }}</span>
 <input type="{{ setting.type }}" [checked]="setting.value" [disabled]="setting.disabled">
 </div>
 }
 </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        background-color: #f0f4f8; /* Light blue-gray background */
        padding: 20px;
        border-radius: 8px;
        color: #333; /* Dark gray text */
      }

      h1 {
        color: #007bff; /* Vibrant blue for heading */
        margin-bottom: 20px;
      }

      .settings-list {
        display: grid;
        gap: 15px;
      }

      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #fff; /* White background for settings item */
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})export class SettingsComponent {
  settings = [
    { id: 1, name: 'Enable Notifications', value: true, type: 'checkbox', disabled: false },
    { id: 2, name: 'Show Live Scores', value: false, type: 'checkbox', disabled: false },
    { id: 3, name: 'Dark Mode', value: false, type: 'checkbox', disabled: true },
    { id: 4, name: 'Currency', value: 'USD', type: 'text', disabled: false },
  ];
}