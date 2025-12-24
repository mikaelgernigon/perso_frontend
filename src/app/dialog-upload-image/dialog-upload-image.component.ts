import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Image } from '../model/image';
import { User } from '../model/user';
import { FileUploadComponent } from '../fileupload/fileupload.component';
import { MatIconModule } from '@angular/material/icon';
import { ImageService } from '../service/imageService';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dialog-upload-image',
  imports: [MatDialogTitle, MatDialogContent, FileUploadComponent, MatIconModule, FormsModule],
  templateUrl: './dialog-upload-image.component.html',

  styleUrl: './dialog-upload-image.component.css'
})
export class DialogUploadImageComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<DialogUploadImageComponent>);
  image: Image = new Image();
  user!: User;
  message!: string;
  @Output()
  eventSubmit = new EventEmitter();
  files: any[] = [];

  constructor(private imageService: ImageService) {}


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.imageService.getImagesByUserId(this.user.userId).subscribe(images =>
      {
        this.files = images;
    });
  }


  closeAndSubmit(): void {
    if (this.image) {
      const data = this.image.chemin;
      this.eventSubmit.emit(data);
    }
  }

  handleEventUploadImage($event: any): void {
    this.image.chemin = $event.chemin;
    this.image.description = $event.description;
    this.files.push(this.image);
  }

  removeUploadedFileCallback(){
    this.image = new Image();
  }


}

