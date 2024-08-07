import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


export interface AuthResponseData{
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn :	string;
  localId	:string;
  status	:string;
  // registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null!);
  // user = new Subject<User>();

   private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }


  private handleAuthentication(email: string, userId:string, token:string, expiresIn: number){
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(email, userId, token, expDate);

    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));

  }

  autoLogout(expirationDuration:number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    },expirationDuration)

  }

  logout(){
    this.user.next(null!);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    // localStorage.clear();

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  login(email:string, password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqFfWQVUtjs9Wd18nxlTdi_uMQy1DBlcg',
      {
          email: email,
          password: password,
          returnSecureToken: true
      }).pipe(tap(res => {
        this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
    }));
  }

  signUp(email:string, password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqFfWQVUtjs9Wd18nxlTdi_uMQy1DBlcg',
      {
          email: email,
          password: password,
          returnSecureToken: true
      }).pipe(tap(res => {
          this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
      }));
  }

}
