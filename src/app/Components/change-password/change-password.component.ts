import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  closePopup() {
    this.close.emit();
  }

  changePassword(newPassword: string) {
    // request do api
  }
}
