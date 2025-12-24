import { inject, Injectable } from '@angular/core';
import { Observable,  of,  ReplaySubject } from 'rxjs';
import { User } from '../model/user';
import Keycloak from 'keycloak-js';
import { switchMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { UserAdd } from '../model/useradd';
import { DataService } from './data.service';
import { Router } from '@angular/router';


@Injectable()
export class UserService extends DataService {
  private readonly keycloak = inject(Keycloak);
  userAdd: UserAdd;

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  constructor (
      private router: Router
  ) {
        super();
        this.url = '/api/user/';
        this.userAdd = new UserAdd();
  }

  public addUser(useradd: UserAdd): Observable<any> {
    return this.create(useradd);
  }

  public updateUser(user: User): Observable<any> {
    return this.update(user);
  }

  public getUserByUserId(userId: string): Observable<any> {
    return this.getByUserId(userId);
  }

  updateKeyCloak(user: User) {
    const url= '/keycloak//admin/realms/mcp/users/' + user.userId;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    };
    const data = {
      "username": user.username,
      "email": user.email
    }
    return this.http.put(url, data, httpOptions);
  }

  async setAccessToken() {
    const profile: any = await this.keycloak.loadUserProfile();
    if(!!this.keycloak.token) {
          localStorage.setItem('token',this.keycloak.token!);
          console.log('token', localStorage.getItem('token'));
          this.setUser(profile);
    } else {
      this.router.navigate(['/home']);
    }
  }


  setUser(profile: any) {
      let currentUser: User = new User();
      currentUser.userId = profile.id;
      currentUser.email = profile.email;
      currentUser.username = profile.username;
      currentUser.description = "";
      currentUser.emailVerified = profile.emailVerified;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.userAdd.email = currentUser.email;
      this.userAdd.userId = currentUser.userId;
      this.userAdd.username = currentUser.username;
      this.userAdd.bio = currentUser.description;
      this.getUserByUserId(currentUser.userId).pipe(
        switchMap( user => this.handleGetUserResponse(user))
      ).subscribe({
        next: this.handleAddUserResponse.bind(this),
        error: this.handleErrorAddUser.bind(this)
      });
  }

  handleGetUserResponse(user: User) {
    if(!!user) {
      return of(user)
    }
    return this.addUser(this.userAdd);
  }

  handleAddUserResponse(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['/profil']);
  }

  handleErrorAddUser(err: any) {
    this.router.navigate(['/error']);
    console.log(err);
  }

}
