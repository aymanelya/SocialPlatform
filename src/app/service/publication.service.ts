import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../Models/publication';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  baseUrl = environment.apiUrl + 'Publication/';

  constructor(private http: HttpClient) {}

  // check link of this one
  getPublications(classid): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'ofclass/' + classid);
  }
  getPublication(id): Observable<Publication> {
    return this.http.get<Publication>(this.baseUrl + id);
  }
  createPub(pub: Publication) {
    return this.http.post(this.baseUrl + 'add', pub, {
      responseType: 'text',
    });
  }
  deletePub(pubid) {
    return this.http.post(this.baseUrl + pubid + '/delete', null, {
      responseType: 'text',
    });
  }
  editPub(pub: Publication) {
    return this.http.post(this.baseUrl, pub, {
      responseType: 'text',
    });
  }
  deleteAtt(attpath) {
    return this.http.post(environment.apiUrl + 'Upload/delete', attpath, {
      responseType: 'text',
    });
  }
}
