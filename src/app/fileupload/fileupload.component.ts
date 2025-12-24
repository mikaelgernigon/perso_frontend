import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {OnInit, ChangeDetectionStrategy, Component, Output, EventEmitter} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { ImageService } from '../service/imageService';
import {Image} from '../model/image';
import {data} from 'jquery';
import {Router} from '@angular/router';
@Component({
  selector: 'app-file-upload',
  templateUrl: './fileupload.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./fileupload.component.css']
})
export class FileUploadComponent implements OnInit {
  uploadForm: FormGroup;
  fileToUpload: File | null = null;
  uploadProgress: number = 0;
  message: string = '';
  user!: any;
  @Output('eventUpload')
  eventUpload = new EventEmitter();

  constructor(private fb: FormBuilder, private imageService: ImageService, private router: Router) {
    // Initialisation ici ou dans ngOnInit
    this.uploadForm = this.fb.group({
      // Un contrôle factice car l'input file n'est pas géré par formControlName
      description: ['', Validators.required]
    });
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  }

  ngOnInit(): void {
    // Le contrôle du fichier sera géré manuellement
  }

  /**
   * Méthode appelée lorsque l'utilisateur sélectionne un fichier.
   * Elle capture le fichier sélectionné dans 'fileToUpload'.
   */
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.fileToUpload = target.files[0];
      this.message = `Fichier sélectionné : ${this.fileToUpload.name}`;
    } else {
      this.fileToUpload = null;
      this.message = 'Aucun fichier sélectionné.';
      this.uploadForm.controls['description'].setValue('');
    }
  }

  /**
   * Méthode appelée à la soumission du formulaire.
   * Elle construit et envoie l'objet FormData.
   */
  onSubmit() {
    if (!this.fileToUpload) {
      this.message = 'Veuillez sélectionner un fichier avant de soumettre.';
      return;
    }

    this.message = 'Téléchargement en cours...';

    this.imageService.upload(this.fileToUpload, this.uploadForm.controls['description'].value, this.user.userId).subscribe({
      next: this.handleImageUploaded.bind(this),
      error: this.handleImageUploadError.bind(this)
    });
  }

  handleImageUploaded(image: Image) {
    if(!!image) {
      this.eventUpload.emit(image);
    }
  }

  handleImageUploadError(err: any) {
    this.message = "Une erreur est survenue : " + err.message;
    console.log(err);
  }
}
