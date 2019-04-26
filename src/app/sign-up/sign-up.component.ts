import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private auth: AuthService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle("Home");
  }

  save(user) {
    this.auth.signUp(user);
  }
}
