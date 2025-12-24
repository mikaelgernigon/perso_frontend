import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { User } from '../model/user';
import Keycloak from 'keycloak-js';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ImageService } from '../service/imageService';
import { UserService } from '../service/user.service';
import { Image } from '../model/image';
import { throwError } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogUploadImageComponent } from '../dialog-upload-image/dialog-upload-image.component';
import { environment } from '../../environment/environment';
@Component({
  selector: 'app-profil',
  imports: [
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilComponent {
  profileForm: FormGroup = new FormGroup({
    idImage: new FormControl(''),
    bio: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl('')
  });
  image: Image;
  user!:any;
  errorAddImageNotFound: boolean = false;
  errorServerAddImage: boolean = false;
  errorServerGetImageById: boolean = false;
  successUpdatedUser: boolean = false;
  errorUpdateUser: boolean = false;
  errorUpdateUserKeycloak: boolean = false
  isPictureHover: boolean = false;
  imgUrl = environment.imgUrl;
  readonly dialog = inject(MatDialog);

  constructor(
    private keycloak: Keycloak,
    private imageService: ImageService,
    private userService: UserService
  ) {
    this.image = new Image();
    const currentUser = localStorage.getItem('currentUser');
    if(currentUser) this.user = JSON.parse(currentUser);
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
      case 404: this.image.chemin = this.imgUrl+"/free/graphique/Claire.png";
                this.image.description = "Image de Masque Mexicain de Femme";
                break;
      default: this.errorServerGetImageById = true;
               throwError(() => err);
               break; 
    }
  }
  
  setIsPictureHover(value: boolean): void {
    this.isPictureHover = value;
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
    this.image = $event
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

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogUploadImageComponent, {
      width: '1500px',
      height: '1000px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
  
}


