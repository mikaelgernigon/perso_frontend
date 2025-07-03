import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Keycloak from 'keycloak-js';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  constructor(
    private keycloak: Keycloak,
    private http: HttpClient
  ) { }

  upload(file: File, userid: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('userid', userid);

    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + this.keycloak.token
    });

    const req = new HttpRequest('POST', `ressources/image`, formData, {
      headers: headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`api/files`);
  }
}