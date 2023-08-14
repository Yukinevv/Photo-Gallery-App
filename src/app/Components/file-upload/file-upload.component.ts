import { Component } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  selectedFile: File | undefined;
  fileName: string = '';
  spanInnerHTML: string = "Brak wybranego pliku.";

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile?.name ?? '';
    this.spanInnerHTML = `Wybrany plik: ${this.fileName}`;
  }

  uploadImage() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }

      const userLogin = localStorage.getItem('userLogin') ?? "";
      const category = localStorage.getItem('category') ?? "";
      if (userLogin === "" || category === "") return;

      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile, this.selectedFile.name);

        this.apiService.uploadImage(formData, userLogin, category).subscribe(
          (response) => {
            console.log(response);
            window.location.reload();
          },
          (error) => {
            console.error('Image upload failed', error);
          }
        );
      }
    });
  }

}
