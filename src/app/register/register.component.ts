import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AlertifyService } from '../service/alertify.service';

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
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.model.Status = 'Student';
  }

  register() {
    this.authService.register(this.model).subscribe(
      (resp) => {
        this.alertify.success(resp);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
