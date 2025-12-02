import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import Keycloak from 'keycloak-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../model/image';

@Injectable()
export class ImageService {

constructor (private keycloak: Keycloak, private httpClient: HttpClient){}


  public addImage(image: Image): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + this.keycloak.token
    });
    return this.httpClient
        .post('/api/image', 
          image
        ,{ headers: headers })
  }

  public getImageById(id: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + this.keycloak.token
    });
    let url: string = '/api/image/' + id;
    return this.httpClient
        .get(url
        ,{ headers: headers })
  }
}
