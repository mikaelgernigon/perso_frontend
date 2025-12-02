import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Observable,  ReplaySubject, throwError } from 'rxjs';
import { User } from '../model/user';
import Keycloak from 'keycloak-js';
import { catchError, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAdd } from '../model/useradd';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (private keycloak: Keycloak, private httpClient: HttpClient) {
        this.isAuthenticatedSubject.next(false);
  }

  public addUser(useradd: UserAdd): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + this.keycloak.token
    });
    const endPoint = '/api/user/';
    return this.httpClient
        .post(endPoint, 
          useradd
        ,{ headers: headers })
  }

  public updateUser(user: User): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + this.keycloak.token
    });
    return this.httpClient
        .put('/api/user/', 
          user
        ,{ headers: headers })
  }

  public getUserByUserId(userId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + this.keycloak.token
    });
    const endpoint = '/api/user/userid/' + userId;
    return this.httpClient
        .get(endpoint
        ,{ headers: headers })
  }

  updateKeyCloak(user: User) {
    const url= '/keycloak//admin/realms/mcp/users/' + user.userId;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.keycloak.token })
    };
    const data = {
      "username": user.username,
      "email": user.email
    }
    return this.httpClient.put(url, data, httpOptions);
  }

}