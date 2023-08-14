import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { Router } from '@angular/router';
import { ButtonVisibilityService } from 'src/app/Services/button-visibility.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router, private settingsButton: ButtonVisibilityService) { }

  ngOnInit() {
  }

  login: string = '';
  password: string = '';

  loginUser() {
    if (this.login === "" || this.password === "") {
      console.log("Pola nie moga byc puste!");
      return;
    }

    this.apiService.login({ login: this.login, password: this.password, email: '' }).subscribe(
      (response: any) => {
        console.log('Logged user:', response);

        localStorage.setItem('userLogin', this.login);

        this.login = '';
        this.password = '';

        this.settingsButton.atLogin();

        this.router.navigate(['/categorieList']);
      },
      error => {
        console.error('Error while login:', error);
      }
    );
  }

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }
}
