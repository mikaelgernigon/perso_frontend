import { Injectable } from '@angular/core';
import { BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { User } from '../model/user';
import { distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
  ) {
        this.isAuthenticatedSubject.next(false);
  }




}