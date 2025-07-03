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
    return this.httpClient
        .post('/api/user/', 
          useradd
        ,{ headers: headers })
  }

  public getUserByUserId(userId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json'
    });
    const endpoint = '/api/user/userid/' + userId;
    return this.httpClient
        .get(endpoint
        ,{ headers: headers })
  }


}