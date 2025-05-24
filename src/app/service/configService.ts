import { Injectable } from '@angular/core';
import { Configuration } from '../model/configuration';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, mergeMap, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
  _configuration!: Configuration;
  
  constructor(private httpClient: HttpClient) {
    
   }

   public getConfig(): Observable<any> {
    return this.httpClient
        .get('assets/config/config.development.json', {
          observe: 'response',
        })
        .pipe(
          catchError((error) => {
            console.log(error)
            return of(null)
          } ),
          mergeMap((response) => {
            if (response && response.body) {
              this._configuration = response.body as Configuration;
              return of(this._configuration);
            } else {
              return of(null);
            }
          }));
  }

}
