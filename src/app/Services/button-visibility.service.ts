import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonVisibilityService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState) {
      this.isLoggedInSubject.next(JSON.parse(storedLoginState));
    }
  }

  private setLoginState(isLoggedIn: boolean) {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    this.isLoggedInSubject.next(isLoggedIn);
  }

  atLogin() {
    this.setLoginState(true);
  }

  atLogout() {
    this.setLoginState(false);
  }
}
