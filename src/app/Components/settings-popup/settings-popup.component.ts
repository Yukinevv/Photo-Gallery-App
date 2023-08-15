import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonVisibilityService } from 'src/app/Services/button-visibility.service';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.css']
})
export class SettingsPopupComponent implements OnInit {

  constructor(private router: Router, private settingsButton: ButtonVisibilityService) { }

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  userLogin: string = '';

  isChangePasswordPopupVisible: boolean = false;

  ngOnInit(): void {
    this.userLogin = localStorage.getItem("userLogin") ?? '';
  }

  closePopup() {
    this.close.emit();
  }

  toggleChangePasswordPopup() {
    this.isChangePasswordPopupVisible = !this.isChangePasswordPopupVisible;
  }

  logOut() {
    localStorage.setItem('userLogin', '');
    this.close.emit();
    this.settingsButton.atLogout(); // po wylogowaniu przycisk ustawien uzytkownika powinien byc niewidoczny
    this.router.navigate(['/login']);
  }
}
