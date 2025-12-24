import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Keycloak from 'keycloak-js';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardConnectedService implements CanActivate{
  private readonly keycloak = inject(Keycloak);
  constructor(private router: Router) {}
  canActivate()  {
    if(this.keycloak.authenticated) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
