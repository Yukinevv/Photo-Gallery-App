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

  isButtonDisabled: boolean = true;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    const tmp = this.selectedFile?.name ?? '';
    if (tmp.length > 10) {
      const tmp2 = tmp.split(".");
      this.fileName = tmp.substring(0, 10) + "." + tmp2[tmp2.length - 1].toLowerCase();
    } else {
      this.fileName = tmp;
    }

    if (this.selectedFile && this.isFileTypeAllowed(this.selectedFile)) {
      this.spanInnerHTML = `Wybrany plik: ${this.fileName}`;
      this.isButtonDisabled = false;
    } else {
      this.spanInnerHTML = "Nieprawidłowy format pliku. Proszę wybrać plik .jpg lub .png";
      this.isButtonDisabled = true;
    }
  }

  isFileTypeAllowed(file: File): boolean {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const tmp = file.name.split(".");
    const fileExtension = '.' + tmp[tmp.length - 1].toLowerCase();
    //console.log(fileExtension);
    return allowedExtensions.includes(fileExtension);
  }

  uploadImage() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        dialogTitle: 'Dodanie obrazu',
        dialogContent: 'Czy na pewno chcesz dodać ten obraz?'
      }
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
