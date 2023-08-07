import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { TaskItemComponent } from './Components/task-item/task-item.component';
import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { FileUploadComponent } from './Components/file-upload/file-upload.component';
import { ImageListComponent } from './Components/image-list/image-list.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'todo', component: TaskListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskItemComponent,
    RegisterFormComponent,
    LoginFormComponent,
    FileUploadComponent,
    ImageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
