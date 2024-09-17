import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { UserToken } from './models/userToken';

const apiUrl = `${environment.apiUrl}/api/auth`;


export interface AuthResponseData{
  name:	string;
  email:	string;
  localId	:number;
  user_type	:number;
  status	:number;
  access_token:	string;
  expires_in :	string;
  token_type:string;
  personID:string;

  // registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<UserToken>(null!);
  // user = new Subject<User>();

   private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }


  private handleAuthentication(name: string,email: string, userId:number, user_type: number, status: number, token:string, expires_in: number){
    const expDate = new Date(new Date().getTime() + expires_in * 1000);

    const user = new UserToken(name, email,userId,user_type, status, token,expDate );

    this.user.next(user);
    this.autoLogout(expires_in * 1000);
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
    localStorage.clear();

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  login(email:string, password:string){
    return this.http.post<AuthResponseData>(`${apiUrl}/login`,
      {
          email: email,
          password: password,
          returnSecureToken: true
      }).pipe(tap(res => {
        this.handleAuthentication(res.name, res.email, res.localId, res.user_type, res.status, res.access_token, +res.expires_in);
    }));
  }

  signUp(value:any){
    return this.http.post<AuthResponseData>(`${apiUrl}/register`,
      {
          name: value.firstname +' '+ value.lastname,
          email: value.email,
          password: value.password,
          password_confirmation: value.password,
          user_type: value.user_type,
          returnSecureToken: true
      }).pipe(tap(res => {
          this.handleAuthentication(res.name,res.email, res.localId, res.user_type, res.status, res.access_token, +res.expires_in);
      }));
  }

  submitResetPassword(value:any){
    return this.http.post<any>(`${apiUrl}/password/reset`,
      {
          otp: value.otp,
          email: value.email,
          password: value.password,
      });
      // .pipe(tap(res => {
      //     this.handleAuthentication(res.email, res.access_token, res.idToken, +res.expires_in);
      // }));
  }

  autoLogin(){

    const userDataString = localStorage.getItem('userData');
    if (userDataString !== null) {  // Check if the string is not null
      try {
        const userData: {
          _name:string;
          _email:string;
          _id:number;
          _type:number;
          _status:number;
          _token:string;
          _tokenExpirationDate:Date;
        } = JSON.parse(userDataString);

        // You can now safely use userData
        if (!userData) {
          return;
        }

        // Proceed with your logic using userData
        const loadedUser = new UserToken(userData._name,userData._email, userData._id, userData._type, userData._status,userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.getToken){
          this.user.next(loadedUser);
          // future date minus(-) current date
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime()- new Date().getTime();
          // this.autoLogout(expirationDuration);
        }else{
          this.logout();
        }

      } catch (error) {
        // Handle JSON parse errors
        console.error('Error parsing user data:', error);
      }
    }

  }



  forgotPassword(email:string){
    return this.http.post<any>(`${apiUrl}/password/forgot`,
      {
          email: email,
      });
  }

}
