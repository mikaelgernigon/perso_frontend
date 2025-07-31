import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
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

  upload(file: File, userid: string): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('userId', userid);

    const headers = new HttpHeaders();
    headers.set('Accept', 'multipart/form-data');
    headers.set('encType', 'multipart/form-data');
    headers.set('Authorization', 'Bearer ' + this.keycloak.token);
    let params = new HttpParams();

    const req = new HttpRequest('POST', 'https://ressources-laroute.ddns.net:8080//image/', formData, {
      headers: headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.post('https://ressources-laroute.ddns.net:8080/image/',formData,{headers: headers});
  }

  getFiles(): Observable<any> {
    return this.http.get(`api/files`);
  }
}