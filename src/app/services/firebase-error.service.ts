import { FirebaseErrorEnum } from "../utils/firebase-code-erro";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }


  firebaseError(code: string){
    switch(code){
      case FirebaseErrorEnum.emailAlreadyInUse:
        return "Desculpe, o usuário já está registrado em nossa plataforma."
      case FirebaseErrorEnum.weakPassword:
        return "A senha que você escolheu é considerada fraca, use pelo menos 6 caracteres."
      case FirebaseErrorEnum.invalidEmail:
        return "Parece que o endereço de e-mail que você inseriu não é válido."
      case FirebaseErrorEnum.errorSenha:
        return "As senhas inseridas não coincidem."
      case FirebaseErrorEnum.invalidLoginCredentials:
        return "As informações de login fornecidas não correspondem a uma conta válida."
      case FirebaseErrorEnum.missingPassword:
        return "A senha inserida não está correta. "
      case FirebaseErrorEnum.tooManyRequests:
        return "O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login mal sucedidas. Entre em contato com um administrador"
      default:
        return "Desculpe, ocorreu um erro desconhecido durante o processo de autenticação. Por favor, entre em contato com nosso suporte para obter assistência.";
    }
  }
}
