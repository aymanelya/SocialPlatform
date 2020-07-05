import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClassService } from '../service/class.service';
import { AlertifyService } from '../service/alertify.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css'],
})
export class AddClassComponent implements OnInit {
  @Output() cancelAddClass = new EventEmitter();
  @Output() isCreated = new EventEmitter();
  model: any = {};

  constructor(
    private classService: ClassService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  create() {
    this.classService.createClass(this.model).subscribe(
      (resp) => {
        this.alertify.success(resp);
        this.isCreated.emit(true);
        this.cancel();
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  cancel() {
    this.cancelAddClass.emit(false);
  }
}
