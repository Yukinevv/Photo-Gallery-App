import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent {

  constructor(private router: Router) { }

  categories: string[] = ['Krajobraz', 'Zwierzeta', 'Sport', 'Gry', 'Inne'];

  goToImageList(categorie: string) {
    localStorage.setItem('category', categorie);
    this.router.navigate(['/todo']);
  }
}
