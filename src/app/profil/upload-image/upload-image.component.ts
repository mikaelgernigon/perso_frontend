import { Component, ElementRef, EventEmitter, Input, OnInit, Output, viewChild, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Observable } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { ConfigService } from '../../service/configService';
import { User } from '../../model/user';
import { HttpHeaders } from '@angular/common/http';
import Keycloak from 'keycloak-js';
import { Image } from '../../model/image';
@Component({
  selector: 'app-upload-image',
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
    TextareaModule,
    FormsModule
  ],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent implements OnInit {
  @Input()
  srcProfil!: string;
  ariaDescr!: string;
  isPictureHover: boolean = false;
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
  @Output() 
  eventSubmit = new EventEmitter();
  @Input()
  image!: Image;
  
  constructor(
    private keycloak: Keycloak,
    private configService: ConfigService
  ) {
    this.user = this.configService._configuration.currentUser;
    console.log('user', this.user);
  }

  ngOnInit(): void {
  }

  setIsPictureHover(value: boolean): void {
    this.isPictureHover = value;
  }

  displayLoadPictureModal(){
    this.visible = true;
    this.ariaDescr = "";
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
    this.headers = new HttpHeaders();
    //headers.set('Accept', 'multipart/form-data');
    //headers.set('encType', 'multipart/form-data');
    this.headers.set('Authorization', 'Bearer ' + this.keycloak.token);
    $event.formData.append('userId', this.user.userId);
  }

  uploadEvent(uploadCallback: any){
    if(this.ariaDescr.trim().length>0) {
      this.fileInput.upload();
    } else  {
      alert("Pensez aux avaugles et saisissez une description de l'image"); 
    }
  }

  onTemplatedUpload($event: any): void{
    this.srcProfil = 'https://ressources-laroute.ddns.net:81/ressources.laroute.ddns.net/' + this.user.userId + '/' + $event.originalEvent.body;
    this.closeAndSubmit();
  }

  onSelectedFile($event: any){
    console.log('select', $event);
  }

  formatSize(size: any): number {
    const sizeInK: number = Math.round(size/1024);
    return sizeInK;
  }

  onRemoveTemplatingFile($event: any, file: any, removeFileCallback: any){
    console.log('remove event', $event);
    console.log('remove file', file);
    console.log('remove callback', removeFileCallback);
    this.ariaDescr = "";
    this.fileInput.remove($event, 0);
  }

  onSelectedFiles($event: any) {
    console.log('selectedFiles', $event);
  }

  closeAndSubmit(): void {
    if(this.fileInput.files.length==1) {
      this.fileInput.clearInputElement();
    }
    const data = {
      "srcProfil": this.srcProfil,
      "description": this.ariaDescr
    }
    this.eventSubmit.emit(data);
    this.visible = false;    
  }

  clearCallback(): void {
    this.ariaDescr = "";
    this.fileInput.clear();
  }  

  onProgress($event: any) : void {
    this.progress = $event.progress;
  }
}