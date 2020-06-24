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
}
