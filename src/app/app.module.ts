import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { FileUploadComponent } from './Components/file-upload/file-upload.component';
import { ImageListComponent } from './Components/image-list/image-list.component';
import { SelectedImagePopupComponent } from './Components/selected-image-popup/selected-image-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategorieListComponent } from './Components/categorie-list/categorie-list.component';
import { FiltersComponent } from './Components/filters/filters.component';
import { SettingsPopupComponent } from './Components/settings-popup/settings-popup.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'categoryList', component: CategorieListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    LoginFormComponent,
    MainPageComponent,
    FileUploadComponent,
    ImageListComponent,
    SelectedImagePopupComponent,
    CategorieListComponent,
    FiltersComponent,
    SettingsPopupComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
