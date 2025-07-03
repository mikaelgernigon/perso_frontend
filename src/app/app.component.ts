import { Component, effect, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component.js';
import { PrimeNG, ThemeConfigType } from 'primeng/config';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'perso_frontend';
  constructor(private primeng: PrimeNG) {
    this.primeng.ripple.set(true);
    const config: ThemeConfigType = {
      theme: {
        options: {
              prefix: 'p',
              darkModeSelector: 'system',
              cssLayer: {
                name: 'primeng',
                order: 'theme, base, primeng, components, utilities'
              },
              ripple: true,
            }
      }
    };
    this.primeng.setThemeConfig(config);    
  }
}
