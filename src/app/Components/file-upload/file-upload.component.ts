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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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
      if (userLogin === "") return;

      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile, this.selectedFile.name);

        this.apiService.uploadImage(formData, userLogin).subscribe(
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
