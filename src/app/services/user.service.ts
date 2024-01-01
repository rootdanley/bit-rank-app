import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {NgToastService} from "ng-angular-popup";
import {FirebaseErrorService} from "./firebase-error.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private firebaseError: FirebaseErrorService,
    private toast: NgToastService,
    private router: Router
  ) { }


  public registerSubmit(email: string, password: string, confirmPassword: string, role: string){
    if (password === confirmPassword) {
      this.afAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        this.verificationEmail();

        const uid = userCredential.user!.uid;
        this.firestore.collection('user').doc(uid).set({
          uid: uid, // Store the UID
          email: email, // Store the email
          role: role
        }).then(() => {
          this.toast.success({
            detail: "Sucesso",
            summary: "Cadastro realizado com sucesso",
            duration: 6000
          })
        }).catch((error) => {

        });

      }).catch((error) => {
        this.toast.error({
          detail:"Error",
          summary: this.firebaseError.firebaseError(error.code).toString(),
          duration: 6000
        })
      });
    } else {
      this.toast.error({
        detail: "Error",
        summary: this.firebaseError.firebaseError('errorSenha').toString(),
        duration: 6000
      })
    }
  }


  verificationEmail() {
    this.afAuth.currentUser
      .then(user => user?.sendEmailVerification())
      .then(() => {
        this.toast.success({
          detail:"Sucesso",
          summary: "Cadastro realizado com sucesso, Verifique seu e-mail!",
          duration: 6000
        })
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.toast.error({
          detail:"Error",
          summary: 'Erro ao verificar e-mail:' + error.toString(),
          duration: 6000
        })
      });
  }
}
