import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Publication } from '../Models/publication';
import { Commentt } from '../Models/comment';
import { PublicationService } from '../service/publication.service';
import { AlertifyService } from '../service/alertify.service';
import { CommentService } from '../service/comment.service';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css'],
})
export class PublicationListComponent implements OnInit {
  @Input() classid: number;
  @Output() refreshPubs = new EventEmitter<boolean>();

  pubs: Publication[];
  publication: Publication;
  comments: Array<string> = [];
  editedpub: string;
  pubid: number;

  focuscom: Array<boolean> = [];
  focuspub: Array<boolean> = [];
  editcom: Array<boolean> = [];
  editpub: Array<boolean> = [];

  constructor(
    private pubService: PublicationService,
    private comService: CommentService,
    public authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  formatAtt(attlink) {
    const pieces = attlink.split('/');
    return pieces[pieces.length - 1];
  }
  formatDate(datestring) {
    const pieces = datestring.split('T');
    const splitdate = pieces[0].split('-');
    const splittime = pieces[1].split(':');
    const date = splitdate[2] + '/' + splitdate[1] + '/' + splitdate[0];
    const time = splittime[0] + 'h ' + splittime[1] + 'min';
    return date + ' ' + time;
  }

  loadPublications() {
    this.pubService.getPublications(this.classid).subscribe(
      (pubs: Publication[]) => {
        this.pubs = pubs;
        if (this.pubid) {
          const index = this.pubs.findIndex(
            (p) => p.publicationId === this.pubid
          );
          this.pubs[index].showComments = true;
        }
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  loadPublication(id) {
    this.pubService.getPublication(id).subscribe(
      (pub: Publication) => {
        this.publication = pub;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  createComment(pubid) {
    this.comService
      .createComment({
        content: this.comments[pubid],
        PublicationId: pubid,
      })
      .subscribe(
        (res) => {
          this.alertify.success(res);
          this.pubid = pubid;
          this.loadPublications();
          this.comments[pubid] = '';
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  deletePub(pubid) {
    this.pubService.deletePub(pubid).subscribe(
      (res) => {
        this.alertify.success(res);
        this.loadPublications();
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
  deleteComment(comid) {
    this.comService.deleteComment(comid).subscribe(
      (res) => {
        this.alertify.success(res);
        this.loadPublications();
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  editComment(comid) {
    this.comService
      .editComment({ commentId: comid, content: this.comments[comid] })
      .subscribe(
        (res) => {
          this.alertify.success(res);
          this.loadPublications();
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    this.editcom[comid] = false;
    this.loadPublications();
  }
  editPub(pubid) {
    this.pubService
      .editPub({ publicationId: pubid, content: this.editedpub })
      .subscribe(
        (res) => {
          this.alertify.success(res);
          this.loadPublications();
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    this.editpub[pubid] = false;
  }

  focusComment(comid) {
    if (this.focuscom[comid] === true) {
      this.focuscom[comid] = false;
    } else {
      this.focuscom[comid] = true;
    }
  }

  focusPub(pubid) {
    if (this.focuspub[pubid] === true) {
      this.focuspub[pubid] = false;
    } else {
      this.focuspub[pubid] = true;
    }
  }

  deleteAtt(attachment) {
    this.pubService
      .deleteAtt({ filepath: attachment.path, fileid: attachment.attachmentId })
      .subscribe(
        (res) => {
          this.alertify.success(res);
          console.log(res);
          this.loadPublications();
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  allowedToEdit(pubOrComment) {
    const item = 'datePublication';
    const user = pubOrComment.owner.UserName;

    if (pubOrComment[item]) {
      this.alertify.message(user);
      return this.focuscom[pubOrComment.commentId];
    } else {
      this.alertify.message(user);
      return this.focuspub[pubOrComment.publicationId];
    }
  }
  //   if (
  //     this.authService.decodedToken.role === 'Prof' ||
  //     this.authService.decodedToken.unique_name
  //   ) {
  //     console.log('hi');
  //   }
  // }
}
