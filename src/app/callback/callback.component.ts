import { Component, inject, OnInit } from '@angular/core';
import Keycloak from 'keycloak-js';
import { User } from '../model/user';
import { ConfigService } from '../service/configService';
import { Router } from '@angular/router';
import { UserAdd } from '../model/useradd';
import { UserService } from '../service/user.service';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {
  
  private readonly keycloak = inject(Keycloak);
  token: string = '';
  userAdd: UserAdd;

  constructor(private configService: ConfigService,
              private userService: UserService,
              private router: Router
  ) {
    this.userAdd = new UserAdd();
  }

  ngOnInit(): void {
    this.setAccessToken();
  }

  async setAccessToken() {
    const profile: any = await this.keycloak.loadUserProfile();
    if(!!this.keycloak.token) {
      this.configService.getConfig().subscribe( 
        data => {
          this.configService._configuration.accessToken = this.keycloak.token!;
          console.log('token', this.configService._configuration.accessToken);
          this.configService._configuration = data;
          this.setUser(profile);
        }
      );
    } else {
      this.router.navigate(['/home']);
    }
  }


  setUser(profile: any) {
    this.configService._configuration.currentUser.userId = profile.id;
    this.configService._configuration.currentUser.email = profile.email;
    this.configService._configuration.currentUser.username = profile.username;
    this.configService._configuration.currentUser.description = "";
    this.configService._configuration.currentUser.emailVerified = profile.emailVerified;
    
    this.userAdd.email = this.configService._configuration.currentUser.email;
    this.userAdd.userId = this.configService._configuration.currentUser.userId;
    this.userAdd.username = this.configService._configuration.currentUser.username;
    this.userAdd.bio = this.configService._configuration.currentUser.description;
    this.userService.getUserByUserId(this.userAdd.userId).subscribe({
      next: this.handleGetUserResponse.bind(this),
      error: this.handleErrorGetUser.bind(this)
    });
  }

  handleGetUserResponse(user: User) {
    this.configService._configuration.currentUser = user;
    this.router.navigate(['/profil']);
  }

  handleErrorGetUser(err: any) {
    switch(err.status) {
      case 404: this.userService.addUser(this.userAdd)
                  .subscribe({
                      next: this.handleAddUserResponse.bind(this),
                      error: this.handleErrorAddUser.bind(this)
                  }
                );
                break;
      default: this.router.navigate(['/error']);
               break; 
    }
  }
  handleAddUserResponse(user: User) {
    this.configService._configuration.currentUser = user;
    this.router.navigate(['/profil']);
  }

  handleErrorAddUser(err: any) {
    console.error('error add', err);
    this.router.navigate(['/error']);
    throwError(() => err);
  }
}