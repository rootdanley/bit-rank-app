import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { UserRoleService } from "../../services/user-role.service";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole$!: Observable<string | null>;
  userEmail$: Observable<string | null>;

  constructor(
    private loginService: LoginService,
    private userRoleService: UserRoleService  // Injetando UserRoleService
  ) {
    this.userEmail$ = this.loginService.getCurrentUserEmail();  // E-mail do usuário atual
  }

  ngOnInit(): void {
    this.userRole$ = this.loginService.getAuthState().pipe(
      switchMap(user => {
        if (user) {
          return this.userRoleService.getUserRole(user.uid);  // Obtendo a role do usuário
        } else {
          return of(null);  // Retorna null para usuários não autenticados
        }
      })
    );
  }

  public logout(){
    this.loginService.logout();
  }
}
