import { Component, OnInit } from '@angular/core';
import Keycloak from 'keycloak-js';
import { User } from '../model/user';
import { ConfigService } from '../service/configService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {
  
  token: string = '';
  
  constructor(private keycloak: Keycloak,
              private configService: ConfigService,
              private router: Router
  ) {
    
  }

  ngOnInit(): void {
    if(!!this.keycloak.token) {
      this.setAccessToken(this.keycloak.token);
    }
    this.router.navigate(['/home']);    
  }

  setAccessToken(token: string) {
    this.configService.getConfig().subscribe( 
      data => {
        this.configService._configuration.accessToken = token;
        this.configService._configuration = data;
        this.setUser();
      }
    );
  }

  async setUser() {
    const profile: any = await this.keycloak.loadUserProfile();
    this.configService._configuration.currentUser.userId = profile.id;
    this.configService._configuration.currentUser.email = profile.email;
    this.configService._configuration.currentUser.emailVerified = profile.emailVerified;
   
  }

}
