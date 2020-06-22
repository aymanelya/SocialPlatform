import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../service/communication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};

  changeName() {
    this.communicationService.changeName(this.model.username);
  }
  onSubmit() {
    this.changeName();
    console.log(this.model);
  }

  constructor(private communicationService: CommunicationService) {}

  ngOnInit(): void {}
}
