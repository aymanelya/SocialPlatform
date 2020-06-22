import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  username = new BehaviorSubject<string>('');
  currentUsername = this.username.asObservable();
  constructor() {}
  changeName(name: string) {
    this.username.next(name);
  }
}
