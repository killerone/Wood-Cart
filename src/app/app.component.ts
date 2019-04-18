import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    auth: AuthService,
    router: Router,
    private userservice: UserService) {
    auth.user$.subscribe(user => {
      if (user) {
        // userservice.save(user);

        let retunUrl = localStorage.getItem('returnUrl');

        if (retunUrl) {
          localStorage.removeItem("returnUrl");
          router.navigateByUrl(retunUrl);
        }
      }
    })

    firebase.firestore().settings({
      timestampsInSnapshots: true
    });
  }
}
