import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from '../Models/class';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  baseUrl = environment.apiUrl + 'Class/';

  constructor(private http: HttpClient) {}
  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.baseUrl);
  }

  getClass(id): Observable<Class> {
    return this.http.get<Class>(this.baseUrl + id);
  }
  createClass(classe: Class) {
    return this.http.post(this.baseUrl + 'add', classe, {
      responseType: 'text',
    });
  }

  joinClass(code) {
    return this.http.post(this.baseUrl + 'join/' + code, null, {
      responseType: 'text',
    });
  }
  joinresp(classid, userid, resp) {
    return this.http.post(this.baseUrl + classid + '/handle/' + userid, resp, {
      responseType: 'text',
    });
  }

  deleteClass(classid) {
    return this.http.post(this.baseUrl + classid + '/delete', null, {
      responseType: 'text',
    });
  }
  leaveClass(classid, userid) {
    return this.http.post(this.baseUrl + classid + '/kick/' + userid, null, {
      responseType: 'text',
    });
  }
}
