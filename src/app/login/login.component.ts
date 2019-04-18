import { AuthService } from './../service/auth.service';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService, private spinner: NgxSpinnerService) {
  }

  login(data) {
    this.spinner.show();
    this.auth.login(data.email, data.pass);
    this.spinner.hide();
  }
}
