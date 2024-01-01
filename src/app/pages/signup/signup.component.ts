import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUserService } from "../../services/register-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerUser: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerUserService: RegisterUserService) {
    this.registerUser = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  registerUserSubmit(){
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const confirmPassword = this.registerUser.value.confirmPassword;

    this.registerUserService.registerUserServiceSubmit(email, password, confirmPassword);

  }

  backToLogin(){
    this.router.navigate(["/login"])
  }
}
