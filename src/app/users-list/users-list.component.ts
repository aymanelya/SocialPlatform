import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { UserService } from '../service/user.service';
import { AlertifyService } from '../service/alertify.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: User[];
  user: User;
  Status = ['Student', 'Prof'];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  loadUser(id) {
    this.userService.getUser(id).subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  delete() {
    this.modalService.dismissAll();
    this.userService.deleteUser(this.user.id).subscribe(
      (resp) => {
        this.alertify.success(resp);
        this.ngOnInit();
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  open(content, id) {
    this.loadUser(id);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  edit() {
    this.modalService.dismissAll();
    this.userService.editUser(this.user).subscribe(
      (resp) => {
        this.alertify.success(resp);
        this.ngOnInit();
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
