import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/User';
import { ApiService } from '../../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

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

        this.goToMainPage();
      },
      error => {
        console.error('Error while login:', error);
      }
    );
  }

  goToMainPage() {
    this.router.navigate(['/categorieList']);
  }

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }
}
