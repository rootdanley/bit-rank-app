import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import AngularFirestore
import { FirebaseErrorService } from './firebase-error.service';
import { NgToastService} from "ng-angular-popup";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private afAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private firebaseError: FirebaseErrorService,
              private toast: NgToastService,
              private userService: UserService
  ) { }

  public registerUserServiceSubmit(email: string, password: string, confirmPassword: string) {
    if (password === confirmPassword) {
      this.afAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        this.userService.verificationEmail();

        const uid = userCredential.user!.uid;
        this.firestore.collection('user').doc(uid).set({
          uid: uid,
          email: email,
          role: 'user'
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
}
