import { Injectable } from '@angular/core';
import {FirebaseErrorService} from "./firebase-error.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {


  constructor(
    private firebaseError: FirebaseErrorService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toast: NgToastService
  ) { }


  public recoveryPassword(email: string){
    this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.router.navigate(['/login'])
        this.toast.info({
          detail: "Info",
          summary: "Verifique seu email",
          duration: 6000
        })
      }).catch((error) => {
      this.toast.error({
        detail: "Error",
        summary: this.firebaseError.firebaseError(error.code).toString(),
        duration: 6000
      })
    })
  }
}
