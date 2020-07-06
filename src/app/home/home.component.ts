import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  register() {
    this.registerMode = true;
  }
  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
}
