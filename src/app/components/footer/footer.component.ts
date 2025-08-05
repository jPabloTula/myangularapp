import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="footer-logo">
              <div class="lion-logo">
                <img src="/assets/images/image.jpg" alt="León Futbolista FC MANEU" class="lion-image">
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <h5>Información</h5>
            <p><strong>Dirección:</strong> Ecuador 185 - Jujuy</p>
            <p><strong>Empresa:</strong> Openix Soft Consulting</p>
          </div>
          <div class="col-md-4">
            <h5>Enlaces</h5>
            <ul class="footer-links">
              <li><a routerLink="/dashboard" routerLinkActive="active">FIXTURES</a></li>
              <li><a routerLink="/profile" routerLinkActive="active">SQUAD</a></li>
              <li><a routerLink="/settings" routerLinkActive="active">MANAGER</a></li>
              <li><a routerLink="/deportes" routerLinkActive="active">PLAYERS</a></li>
              <li><a routerLink="/paises" routerLinkActive="active">CONTACT</a></li>
            </ul>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-12 text-center">
            <p class="copyright">© 2023 FC MANEU. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
    .footer {
      background-color: #003366;
      color: white;
      padding: 40px 0 20px;
      margin-top: 50px;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
    }
    
    .footer-logo {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
    }
    
    .lion-logo {
      width: 120px;
      height: 120px;
      overflow: hidden;
      border-radius: 10px;
      border: 3px solid #e0a800;
      box-shadow: 0 5px 15px rgba(0,0,0,0.5);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .lion-logo:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.7);
    }
    
    .lion-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .footer h5 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
      border-bottom: 2px solid rgba(255,255,255,0.1);
      padding-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .footer-links li {
      margin-bottom: 10px;
    }
    
    .footer-links a {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s;
    }
    
    .footer-links a:hover {
      color: white;
      text-decoration: none;
    }
    
    .footer-links a.active {
      color: white;
      font-weight: bold;
    }
    
    .copyright {
      font-size: 14px;
      color: #aaa;
      margin-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 20px;
    }
    
    @media (max-width: 768px) {
      .footer {
        padding: 30px 0 15px;
        text-align: center;
      }
      
      .footer-logo {
        margin: 0 auto 20px;
      }
      
      .footer h5 {
        margin-top: 20px;
      }
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
}