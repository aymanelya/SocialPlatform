import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentt } from '../Models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  baseUrl = environment.apiUrl + 'Comment/';

  constructor(private http: HttpClient) {}

  getComments(pubid): Observable<Commentt[]> {
    return this.http.get<Commentt[]>(this.baseUrl + 'publication' + pubid);
  }
  getComment(id): Observable<Commentt> {
    return this.http.get<Commentt>(this.baseUrl + id);
  }
  createComment(com: Commentt) {
    return this.http.post(this.baseUrl + 'add', com, {
      responseType: 'text',
    });
  }

  deleteComment(comid) {
    return this.http.post(this.baseUrl + comid + '/delete', null, {
      responseType: 'text',
    });
  }

  editComment(com: Commentt) {
    return this.http.post(this.baseUrl, com, {
      responseType: 'text',
    });
  }
}
