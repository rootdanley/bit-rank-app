import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire/compat";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SignupComponent } from './pages/signup/signup.component';

import { environment } from "../environment/environment";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { NgToastModule } from "ng-angular-popup";
import { AdminComponent } from './pages/admin/admin.component';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { AdminQuizComponent } from './components/admin/admin-quiz/admin-quiz.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { PerfilComponent } from './components/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    RecoveryComponent,
    AdminComponent,
    UserManagementComponent,
    AdminQuizComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    CategoryListComponent,
    QuestionsComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    BrowserAnimationsModule,
    NgToastModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
