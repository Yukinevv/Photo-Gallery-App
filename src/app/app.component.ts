import { Component } from '@angular/core';
import { ButtonVisibilityService } from './Services/button-visibility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private settingsButton: ButtonVisibilityService) { }

  isPopupVisible: boolean = false;
  isButtonVisible: boolean = true;

  isLoggedIn$ = this.settingsButton.isLoggedIn$;

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
    this.isButtonVisible = !this.isPopupVisible;
  }
}