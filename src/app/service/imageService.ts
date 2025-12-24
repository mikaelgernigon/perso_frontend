import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {HttpHeaders} from '@angular/common/http';
import { Image } from '../model/image';
import { DataService } from "./data.service";
import { environment } from '../../environment/environment';
import { switchMap } from 'rxjs/operators';
@Injectable()
export class ImageService extends DataService{

  imgUrl = environment.imgUrl;

  constructor () {
        super();
        this.url = '/api/image/';
  }



  public addImage(image: Image): Observable<any> {
    return this.create(image);
  }

  public updateImage(image: Image): Observable<any> {
    return this.update(image);
  }

  public getImagesByUserId(userId: string): Observable<any> {
    return this.getByUserId(userId);
  }


  public getImageById(id: number): Observable<any> {
    return this.get(id);
  }

  public upload(file: any, description: string, userId: string) {
    // Créer un objet FormData pour encapsuler le fichier et les autres données
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('userId', userId);
    // Ajoutez d'autres champs si nécessaire (ex: formData.append('userId', '123'))

    // URL de votre API backend
    const uploadUrl = '/ressources/image/';
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(uploadUrl,formData, {
      headers: headers
    }).pipe(
      switchMap(
      (event)   =>
      {
          let image: Image = new Image();
          image.chemin = this.imgUrl + '/ressources.laroute.ddns.net/' + userId + '/' + event;
          image.description = description;
          image.userId = userId;
          return this.addImage(image)
      })
    )
  }
}
