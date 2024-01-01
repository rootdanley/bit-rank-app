import {Component, OnInit} from '@angular/core';
import { LoginService } from "../../services/login.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent{

  userEmail$: Observable<string | null>;

  constructor(private loginService: LoginService) {
    this.userEmail$ = this.loginService.getCurrentUserEmail();
  }

}
