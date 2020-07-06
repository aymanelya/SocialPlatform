import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AlertifyService } from '../service/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  Status = ['Student', 'Prof'];
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.model.Status = 'Student';
  }

  register() {
    this.authService.register(this.model).subscribe(
      (resp) => {
        this.alertify.success(resp + '<br/>You can now login!');
        this.cancel();
        this.login({
          username: this.model.UserName,
          password: this.model.password,
        });
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  login(model) {
    this.authService.login(model).subscribe(
      (next) => {
        this.alertify.success('logged in successfully');
      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/classes']);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
