import { Component } from '@angular/core';
import { User } from '../../Models/User';
import { ApiService } from '../../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  constructor(private apiService: ApiService, private router: Router) { }

  login: string = '';
  password1: string = '';
  password2: string = '';
  email: string = ''

  errorMessage: string = '';
  successMessage: string = '';

  registerUser() {
    if (this.password1 !== this.password2) {
      this.errorMessage = "Podane hasla nie sa takie same!";
      return;
    } else if (this.login === "" || this.password1 === "" || this.email === "") {
      this.errorMessage = "Uzupełnij wszystkie pola!";
      return;
    } else if (this.password1.length < 5) {
      this.errorMessage = "Haslo nie moze miec mniej niz 5 znakow!";
      return;
    }

    const user = new User(this.login, this.password1, this.email);

    // request do api z utworzeniem uzytkownika
    this.apiService.createUser(user).subscribe(
      response => {
        console.log('Post created:', response);
        this.successMessage = "Rejestracja powiodla sie!";
        this.errorMessage = '';
      },
      error => {
        console.error('Error creating post:', error);

        if (error.status === 403) {
          this.errorMessage = 'Uzytkownik o podanym loginie juz istnieje!';
        } else {
          this.errorMessage = 'Wystąpił błąd podczas rejestracji!';
        }
      }
    );

    this.login = '';
    this.password1 = '';
    this.password2 = '';
    this.email = '';
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }
}
