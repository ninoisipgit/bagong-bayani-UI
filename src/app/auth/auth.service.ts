import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

const apiUrl = `${environment.apiUrl}/api/auth`;


export interface AuthResponseData{
  idToken:	string;
  email:	string;
  refreshToken?:	string;
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
        this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
    }));
  }

  signUp(value:any){
    return this.http.post<AuthResponseData>(`${apiUrl}/register`,
      {
          name: value.firstname +' '+ value.lastname,
          email: value.email,
          password: value.password,
          password_confirmation: value.password,
          returnSecureToken: true
      }).pipe(tap(res => {
          this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
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
      //     this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
      // }));
  }

  // autoLogin(){
  //   const userData:{
  //     _accessToken:string;
  //     scope:string;
  //     tokenType:string;
  //     _tokenExpirationDate: string;
  //     _isAdmin: boolean;
  //     _superUser: boolean;
 
  //   } = JSON.parse(localStorage.getItem('userData'));
  //   if(!userData){
  //     return;
  //   }
  //   this.userInfo.subscribe(res => {
  //     this.getUserOrganization().subscribe((response:UserOrganization) => {
  //       if ((!response?.status || !res?.status) && !userData?._isAdmin && !userData?._superUser) {
  //         Swal.fire({
  //           title: "",
  //           text: "This organization or user is not registered. Please contact St. David's Foundation (evalstrategiclearning@stdavidsfoundation.org) for more information.",
  //           icon: "error",
  //           confirmButtonText: "Ok",
  //         }).then((res) => {
  //           this.logout();
  //         });
  //       }
  //     });
  //   });
  //   this.resetTimeout();
  //   const loadedUser = new UserToken(userData._accessToken, userData.scope, userData.tokenType, new Date(userData._tokenExpirationDate))
  //   if(loadedUser.getToken){
  //     this.user.next(loadedUser);
  //     // future date minus(-) current date
  //     const expirationDuration = new Date(userData._tokenExpirationDate).getTime()- new Date().getTime();
  //     // this.autoLogout(expirationDuration);
  //   }else{
  //     this.logout();
  //   }
  // }

  forgotPassword(email:string){
    return this.http.post<any>(`${apiUrl}/password/forgot`,
      {
          email: email,
      });
  }

}
