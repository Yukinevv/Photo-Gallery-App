import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/Services/api.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor(private apiService: ApiService, private dialog: MatDialog, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      currentPasswordInput: [''],
      newPasswordInput: [''],
      confirmNewPasswordInput: ['']
    });
  }

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  myForm: FormGroup;

  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  closePopup() {
    this.close.emit();
  }

  changePassword() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        dialogTitle: 'Zmiana hasła',
        dialogContent: 'Czy na pewno chcesz zmienić swoje hasło?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }

      const userLogin = localStorage.getItem("userLogin") ?? "";
      if (userLogin === "") return;

      if (this.currentPassword === "" || this.newPassword === "" || this.confirmNewPassword === "") {
        this.errorMessage = "Pola nie mogą byc puste!";
        return;
      } else if (this.newPassword !== this.confirmNewPassword) {
        this.errorMessage = "Nowo podane hasła nie są takie same!";
        return;
      } else if (this.currentPassword === this.newPassword) {
        this.errorMessage = "Obecne oraz nowe hasło nie może byc takie same!";
        return;
      } else if (this.newPassword.length < 5) {
        this.errorMessage = "Hasło nie może mieć mniej niz 5 znaków!";
        return;
      }

      this.apiService.changePassword(this.newPassword, this.currentPassword, userLogin).subscribe(
        (response: any) => {
          console.log(response);
          if (response.message === "Wrong password") {
            this.errorMessage = "Podano niepoprawne hasło!";
            this.currentPassword = '';
          } else {
            this.successMessage = "Hasło zostało zmienione!";
            this.errorMessage = '';
            this.myForm.reset();
          }
        },
        (error) => {
          console.log('Error while changing user password', error);
        }
      );
    });
  }
}
