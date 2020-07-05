import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../service/alertify.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from '../service/class.service';
import { Class } from '../Models/class';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-cards.component.html',
  styleUrls: ['./classes-cards.component.css'],
})
export class ClassesListComponent implements OnInit {
  classes: Class[] = [];
  class: Class;
  addMode = false;
  convMode = false;
  joinCode: string;
  prof = this.authService.decodedToken?.role === 'Prof';

  constructor(
    private classService: ClassService,
    private alertify: AlertifyService,
    private authService: AuthService,
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

  loadClass(id) {
    this.classService.getClass(id).subscribe(
      (classe: Class) => {
        this.class = classe;
        this.convMode = true;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  join() {
    this.classService.joinClass(this.joinCode).subscribe(
      (res) => {
        this.alertify.success(res);
        console.log(res);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
    this.joinCode = '';
  }

  add() {
    this.addMode = true;
  }
  conv() {
    this.convMode = true;
  }
  cancelAddMode(addMode: boolean) {
    this.addMode = addMode;
  }
  isCreated(created: boolean) {
    if (created) {
      this.ngOnInit();
    }
  }

  backToHome() {
    this.convMode = false;
    this.loadClasses();
  }
}
