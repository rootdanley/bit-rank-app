import { inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap, map, take } from 'rxjs/operators';
import { User } from "../models/User";

export function canActivateAdmin(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> {
  const router = inject(Router);
  const afAuth = inject(AngularFireAuth);
  const firestore = inject(AngularFirestore);

  return afAuth.authState.pipe(
    switchMap(user => {
      if (user) {
        return firestore.collection('user').doc<User>(user.uid).valueChanges();
      } else {
        router.navigate(['/login']);
        return of(null);
      }
    }),
    map(user => {
      const isAdmin = user?.role === 'admin';
      if (!isAdmin) {
        router.navigate(['/home']);
      }
      return isAdmin ? true : router.parseUrl('/home');
    }),
    take(1)
  );
}
