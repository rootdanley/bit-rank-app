import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  public loginUser() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.loginService.loginUsuario(email, password);
  }

  registerUser(){
    this.router.navigate(['/signup'])
  }

  ngOnInit(): void{ }

}
