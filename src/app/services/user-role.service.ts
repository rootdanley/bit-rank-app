import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {map, Observable} from 'rxjs';
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(private firestore: AngularFirestore) { }

  public getUserRole(userId: string): Observable<string> {
    return this.firestore.collection('user').doc<User>(userId).valueChanges()
      .pipe(
        map(user => user ? user.role : 'user')
      );
  }
}
