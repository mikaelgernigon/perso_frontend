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

    formData.append('file', file, file.name);
    formData.append('userId', userid);

    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();

    // URL de votre API backend
    const uploadUrl = 'https://ressources-laroute.ddns.net:8080/image/'; 

    return this.http.post(uploadUrl,formData, {
      reportProgress: true, // Pour suivre la progression du téléchargement
      observe: 'events',
      headers: headers
    })
  }

  getFiles(): Observable<any> {
    return this.http.get(`api/files`);
  }
}