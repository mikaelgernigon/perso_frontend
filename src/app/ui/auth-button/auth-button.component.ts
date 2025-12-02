import { Component, effect, inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import {
  HasRolesDirective,
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  typeEventArgs,
  ReadyArgs
} from 'keycloak-angular';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth-button',
  imports: [RouterModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.css'
})
export class AuthButtonComponent {
  authenticated = false;
  keycloakStatus: string | undefined;
  private readonly keycloak = inject(Keycloak);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

  constructor(private router: Router) {
    effect(() => {
      const keycloakEvent = this.keycloakSignal();

      this.keycloakStatus = keycloakEvent.type;

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated = false;
      }
    });
  }

  login() {
    this.keycloak.login({redirectUri: 'https://localhost:4200/callback'});
  }

  logout() {
    var logoutOptions = { redirectUri : "https://localhost:4200/home" };
    this.keycloak.logout(logoutOptions)
    .then((success) => {
      console.log("--> log: logout success ", success );
    }).catch((error) => {
      console.log("--> log: logout error ", error );
    });
  }

  redirectToProfil(){
    this.router.navigate(['/profil']);
  }
}