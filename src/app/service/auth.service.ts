import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login(email, password) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.afAuth.authState.subscribe(user => {
        this.router.navigate(["/"]);
      })
    })
  }

  signUp(user) {

    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.pass).then(response => {
      response.user.updateProfile({
        displayName: user.name,
        photoURL: null
      }).then(res => {
        this.userService.save(response.user.uid, user.name, user.email).then(() => {
          this.login(user.email, user.pass);
        })
      })
    })
  }

  logout() {
    this.afAuth.auth.signOut().then(a => {
      this.router.navigate(["/"]);
    });
    localStorage.removeItem("isAdmin");
  }

  get appUser$(): Observable<AppUser> {

    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc('/users/' + user.uid).valueChanges();
        } else {
          return of(null);
        }
      }
      ))
  }
}
