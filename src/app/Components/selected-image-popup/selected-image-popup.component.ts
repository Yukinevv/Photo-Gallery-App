import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '../../Models/Image';
import { ApiService } from 'src/app/Services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-selected-image-popup',
  templateUrl: './selected-image-popup.component.html',
  styleUrls: ['./selected-image-popup.component.css']
})
export class SelectedImagePopupComponent {

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  @Input() selectedImage: Image | null = null;
  @Output() close = new EventEmitter<void>();

  newFilename: string = '';

  closePopup() {
    this.close.emit(); // selectedImage = null
  }

  deleteImage(id?: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }

      const imageId = id ?? "";
      if (imageId === "") return;

      this.apiService.deleteImage(imageId).subscribe(
        (response) => {
          console.log(response);
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting image', error);
        }
      );
    });
  }

  changeFilename(newFilename: string, id?: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }

      const imageId = id ?? "";
      if (imageId === "" || newFilename === "") {
        console.log('Pole nie moze byc puste!');
        return;
      }

      this.apiService.changeFilename(imageId, newFilename).subscribe(
        (response) => {
          console.log(response);
          window.location.reload();
        },
        (error) => {
          console.log('Error changing image filename', error);
        }
      );
    });
  }

}
