import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  registerUserSubmit(){
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;
    const confirmPassword = this.userForm.value.confirmPassword;
    const role = this.userForm.value.role;

    this.userService.registerSubmit(email,password,confirmPassword,role);
  }
}
