import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Class } from '../Models/class';
import { Publication } from '../Models/publication';
import { PublicationService } from '../service/publication.service';
import { AlertifyService } from '../service/alertify.service';
import { PublicationListComponent } from '../publication-list/publication-list.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from '../service/class.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-class-wall',
  templateUrl: './class-wall.component.html',
  styleUrls: ['./class-wall.component.css'],
})
export class ClassWallComponent implements OnInit {
  @Input() classData: Class;
  @Output() backhome = new EventEmitter<boolean>();
  @Output() reloadClass = new EventEmitter<number>();
  model: any = {};
  publications: Publication[] = [];
  attachment: boolean;
  files: string[];

  @ViewChild('publist') publist: PublicationListComponent;

  constructor(
    public authService: AuthService,

    private pubService: PublicationService,
    private classService: ClassService,
    private alertify: AlertifyService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.attachment = false;
  }

  back() {
    this.backhome.emit(false);
  }

  addpub() {
    this.model.ClassId = this.classData.classId;
    this.model.Files = this.files;

    this.pubService.createPub(this.model).subscribe(
      (resp) => {
        this.alertify.success(resp);
        this.model = {};
        this.files = undefined;
        this.publist.ngOnInit();
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  toggleattachment() {
    this.attachment = !this.attachment;
  }
  receiveFiles($event) {
    this.files = $event;
    this.toggleattachment();
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  reply(userid, decision) {
    // this.alertify.message(decision);
    this.classService
      .joinresp(this.classData.classId, userid, {
        resp: decision === 'true',
      })
      .subscribe(
        (resp) => {
          this.alertify.success(resp);
          this.reloadClass.emit(this.classData.classId);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  deleteClass(classid) {
    if (this.authService.decodedToken.role === 'Prof') {
      this.classService.deleteClass(classid).subscribe(
        (resp) => {
          this.alertify.success(resp);
          this.back();
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    } else {
      this.classService
        .leaveClass(classid, this.authService.decodedToken.nameid)
        .subscribe(
          (resp) => {
            this.alertify.success(resp);
            this.back();
          },
          (error) => {
            this.alertify.error(error);
          }
        );
    }
  }
}
