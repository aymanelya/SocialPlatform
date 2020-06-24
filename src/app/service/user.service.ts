import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl + 'Auth/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  editUser(user: User) {
    return this.http.post(this.baseUrl + 'Edit/', user, {
      responseType: 'text',
    });
  }

  deleteUser(id) {
    return this.http.post(this.baseUrl + 'Delete/' + id, '', {
      responseType: 'text',
    });
  }
}
