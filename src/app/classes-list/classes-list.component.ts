import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../service/alertify.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from '../service/class.service';
import { Class } from '../Models/class';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css'],
})
export class ClassesListComponent implements OnInit {
  classes: Class[];
  class: Class;

  constructor(
    private classService: ClassService,
    private alertify: AlertifyService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    this.classService.getClasses().subscribe(
      (classes: Class[]) => {
        this.classes = classes;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
