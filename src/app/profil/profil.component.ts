import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { MessageService } from 'primeng/api';
import { FileUploadService } from '../service/file-uploadService';
import { Observable } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { ConfigService } from '../service/configService';
import { User } from '../model/user';
import { HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import Keycloak from 'keycloak-js';
@Component({
  selector: 'app-profil',
  imports: [
    DialogModule,
    ButtonModule,
    FileUploadModule,
    ToastModule,
    ProgressBarModule,
    BadgeModule,
    OverlayBadgeModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    TextareaModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
  providers: [ MessageService ]
})
export class ProfilComponent {
  srcProfil:string = 'https://ressources-laroute.ddns.net:81/free/graphique/Claire.png';
  description!:string;
  isPictureHover: boolean = true;
  visible: boolean = false;
  progress: number = 0;
  totalSize: number = 0;
  index: number = 0;
  currentFile?: File;
  fileInfos?: Observable<any>;
  user!: User;
  message!: string;
  uploadError: boolean = false;
  headers!: any;
   @ViewChild(FileUpload) fileInput!: FileUpload;
  constructor(
    private keycloak: Keycloak,
    private configService: ConfigService,
    private uploadService: FileUploadService
  ) {
    this.user = this.configService._configuration.currentUser;
  }


  setIsPictureHover(value: boolean): void {
    this.isPictureHover = value;
  }

  displayLoadPictureModal(){
    this.visible = true;
  }

  choose($event: any, chooseCallback: any){
    if(!!this.fileInput) {
      this.fileInput.advancedFileInput.nativeElement.click();
    } else {
      console.warn('file Input is undefined');
    }
  }

  handleResponseUploadPictureProfile(filename: string): void {
    console.log('file uploaded successfully');
    this.uploadError = false;
  }

  handleErrorResponseUploadPictureProfile(err: any) : void {
    console.error('file not uploaded for userid : ', this.user.userId);
    console.error('error upload : ', err);
    this.uploadError = true;
  }

  onBeforeUpload($event: any) {
    this.headers = new HttpHeaders({
      'Accept': 'application/json',
      //'Content-Type':'application/json',
      'Authorization': 'Bearer ' + this.keycloak.token
    });
    $event.formData.append('userid', this.user.userId);
  }

  uploadEvent(uploadCallback: any){
    if(!!this.description && this.description.trim().length>0) {
      this.fileInput.upload();
    } else  {
      alert("Pensez aux avaugles et saisissez une description de l'image");
    }
  }

  onTemplatedUpload(){
    console.log('on template upload');
  }

  onSelectedFile($event: any){
    console.log('select', $event);
  }

  formatSize(size: any): number {
    console.log('size', size);
    const sizeInK: number = Math.round(size/1024);
    return sizeInK;
  }

  onRemoveTemplatingFile($event: any, file: any, removeFileCallback: any){
    console.log('remove event', $event);
    console.log('remove file', file);
    console.log('remove callback', removeFileCallback);
    this.description = "";
    this.fileInput.remove($event, 0);
  }

  onSelectedFiles($event: any) {
    console.log('selectedFiles', $event);
  }

  close(): void {
    if(this.fileInput.files.length==1) {
      this.description = "";
      this.fileInput.clearInputElement();
    }
    this.visible = false;
  }

  clearCallback(): void {
    this.description = "";
    this.fileInput.clear();
  }

}
