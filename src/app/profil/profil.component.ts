import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfigService } from '../service/configService';
import { User } from '../model/user';
import Keycloak from 'keycloak-js';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ImageService } from '../service/imageService';
import { UserService } from '../service/user.service';
import { Image } from '../model/image';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-profil',
  imports: [
    UploadImageComponent,
    ButtonModule,
    TextareaModule,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
  providers: [ MessageService ]
})
export class ProfilComponent {
  profileForm: FormGroup = new FormGroup({
    idImage: new FormControl(''),
    bio: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl('')
  });
  image: Image;
  user: User;
  errorAddImageNotFound: boolean = false;
  errorServerAddImage: boolean = false;
  errorServerGetImageById: boolean = false;
  successUpdatedUser: boolean = false;
  errorUpdateUser: boolean = false;
  errorUpdateUserKeycloak: boolean = false
  constructor(
    private keycloak: Keycloak,
    private configService: ConfigService,
    private imageService: ImageService,
    private userService: UserService
  ) {
    this.image = new Image();
    this.user = this.configService._configuration.currentUser;
    this.reset();
  }

  save() {
    this.user.bio = this.profileForm.get('bio')?.value;
    this.user.email = this.profileForm.get('email')?.value;
    this.user.username = this.profileForm.get('username')?.value;
    this.user.idImage = this.profileForm.get('idImage')?.value;
    this.successUpdatedUser = false;
    this.errorUpdateUserKeycloak = false;
    this.errorUpdateUser = false;
    this.userService.updateKeyCloak(this.user).subscribe({
      next: this.handleUpdateUserKeycloakResponse.bind(this),
      error: this.handleErrorUpdateUserKeycloak.bind(this)
    })
  }

  handleUpdateUserKeycloakResponse(data: any) {
    this.userService.updateUser(this.user).subscribe({
      next: this.handleUpdateUserResponse.bind(this),
      error: this.handleErrorUpdateUser.bind(this)
    })
  }

  handleErrorUpdateUserKeycloak(err: any) {
    this.errorUpdateUserKeycloak = true;
    throwError(() => err);
  }

  handleUpdateUserResponse(user: User) {
    this.successUpdatedUser = true;
  }

  handleErrorUpdateUser(err: any) {
    this.errorUpdateUser = true;
    throwError(() => err);
  }
  
  reset() {
    this.profileForm.get('username')?.setValue(this.user.username);
    this.profileForm.get('email')?.setValue(this.user.email);
    this.profileForm.get('bio')?.setValue(this.user.bio);
    this.profileForm.get('idImage')?.setValue(this.user.idImage);
    this.image = new Image();
    this.imageService.getImageById(this.user.idImage).subscribe({
      next: this.handleGetImageByIdResponse.bind(this),
      error: this.handleErrorGetImageById.bind(this)
    });
  }

  handleGetImageByIdResponse(image: Image) {
    this.image.chemin = image.chemin;
    this.image.description = image.description;
    this.errorServerGetImageById = false;
  }

  handleErrorGetImageById(err: any) {
    this.errorServerGetImageById = false;
    switch(err.status) {
      case 400: 
      case 404: this.image.chemin = "https://ressources-laroute.ddns.net:81/images/free/graphique/Claire.png";
                this.image.description = "";
                break;
      default: this.errorServerGetImageById = true;
               throwError(() => err);
               break; 
    }
  }
  
  updatePassword(){
    this.keycloak.login(
      {
        "redirectUri": "https://ressources-laroute.ddns.net:4200/callback",
        "action": "UPDATE_PASSWORD"
      }
    )
  }

  handleEventSubmitImageProfileForm($event: any): void {
    this.image.chemin = $event.srcProfil;
    this.image.description = $event.decription;
    this.imageService.addImage(this.image).subscribe({
      next: this.handleAddImageResponse.bind(this),
      error: this.handleErrorAddImage.bind(this)
    });
  }

  handleAddImageResponse(image: Image) {
    this.image = image;
    this.profileForm.get('idImage')?.setValue(this.image.id);
    this.errorAddImageNotFound = false;
    this.errorServerAddImage = false;
  }

  handleErrorAddImage(err: any) {
    this.errorAddImageNotFound = false;
    this.errorServerAddImage = false;
    switch(err.status) {
      case 404: this.errorAddImageNotFound = true
                break;
      default: this.errorServerAddImage = true;
               break; 
    }
    throwError(() => err);
  }

}
