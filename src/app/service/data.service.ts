import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public http = inject(HttpClient);
  public url!: string; // Set your API base URL here or inject from config

  constructor() { }
  create(resource: any) {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(this.url, resource,{ headers: headers })
     .pipe(
        catchError(err => {
          console.error('Error creating resource', err);
          return throwError(() => err);
        })
      );
  }
  
  update(resource: any) {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put(this.url, resource,{ headers: headers })
    .pipe(
        catchError(err => {
          console.error('Error updating resource', err);
          return throwError(() => err);
        })
      );
  }
  
  delete(id: any) {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete(`${this.url}/${id}`,{ headers: headers })
    .pipe(
        catchError(err => {
          console.error('Error deleting resource', err);
          return throwError(() => err);
        })
      );
  }
  
  get(id: any) {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.url}${id}`,{ headers: headers })
    .pipe(
        catchError(err => {
          console.error('Error getting resource', err);
          return throwError(() => err);
        })
      );
  }

  
  
  getAll() {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.url,{ headers: headers })
    .pipe(
        catchError(err => {
          console.error('Error getting all resources', err);
          return throwError(() => err);
        })
      );
  }

  public getByUserId(userId: string) {
      const headers: HttpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      return this.http.get(`${this.url}userid/${userId}`,{ headers: headers })
      .pipe(
          catchError(err => {
            console.error('Error getting resources', err);
            return throwError(() => err);
          })
        );
    }
}