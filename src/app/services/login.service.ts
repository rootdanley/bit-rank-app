import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseErrorService } from './firebase-error.service';
import { BehaviorSubject, Observable } from "rxjs";
import { take } from 'rxjs/operators';
import { NgToastService } from "ng-angular-popup";
import { UserRoleService } from './user-role.service'; // Import the new service

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public currentUserEmail = new BehaviorSubject<string | null>(null);

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firebaseError: FirebaseErrorService,
    private toast: NgToastService,
    private userRoleService: UserRoleService
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUserEmail.next(user.email);
      } else {
        this.currentUserEmail.next(null);
      }
    });
  }

  public getAuthState(): Observable<any> {
    return this.afAuth.authState;
  }

  public loginUsuario(email: string, password: string) {
    this.afAuth.setPersistence('session')
      .then(() => {
        this.afAuth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            if (userCredential.user!.emailVerified) {
              this.userRoleService.getUserRole(userCredential.user!.uid)
                .pipe(take(1))
                .subscribe(role => {
                  this.navigateBasedOnRole(role);
                  this.toast.success({
                    detail: "Sucesso",
                    summary: "Bem vindo, " + userCredential.user?.email,
                    duration: 4000
                  })
                });
            } else {
              this.toast.info({
                detail: "Info",
                summary:"Por favor, verifique seu email",
                duration: 6000
              })
            }
          })
          .catch((error) => {
            this.toast.error({
              detail: "Error",
              summary: this.firebaseError.firebaseError(error.toString()),
              duration: 6000
            });
          });
      })
      .catch((error) => {
        this.toast.error({
          detail: "Error",
          summary: "Error configuring persistence" + error.toString(),
          duration: 6000
        });
      });
  }

  public getCurrentUserEmail(): Observable<string | null> {
    return this.currentUserEmail.asObservable();
  }

  private navigateBasedOnRole(role: string) {
    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  public logout() {
    this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }



}
