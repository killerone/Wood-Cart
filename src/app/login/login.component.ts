
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error: string;
  constructor(
    private afAuth: AngularFireAuth,
    private title: Title,
    private router: Router) {
    this.title.setTitle("Login");
  }

  login(data) {
    // this.authService.login(data.email, data.pass);
    this.afAuth.auth.signInWithEmailAndPassword(data.email, data.pass)
      .then(() => {
        this.afAuth.authState.subscribe(user => {
          this.router.navigate(["/"]);
        })
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
          this.error = 'No User with the given Email found.';
        }
        if (err.code === 'auth/wrong-password') {
          this.error = 'Password incorrect!';
        }
        if (err.code === 'auth/user-disabled') {
          this.error = 'User has been banned. Please contact the administrator.';
        }
      })
  }
}
