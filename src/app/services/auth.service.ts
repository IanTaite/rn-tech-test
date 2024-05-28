import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(username: string, password: string) {
    this.isAuthenticatedSubject.next(true);
    return of(true);
  }

  logoff() {
    this.isAuthenticatedSubject.next(false);
  }
}
