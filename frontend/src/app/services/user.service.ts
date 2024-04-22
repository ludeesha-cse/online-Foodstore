import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/iUserReguster';
import { JwtDecoderService } from './jwt-decoder.service';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );

  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastRService: ToastrService, private jwtDecoderService: JwtDecoderService) {

    this.userObservable = this.userSubject.asObservable();
    // const user = localStorage.getItem('User');
    // if(user){
    //   const token = (JSON.parse(user) as User).token;
    //   const decodedToken = jwtDecoderService.decodeToken(token);
    // }
  }

  public get isAdmin(): boolean {
    return this.userSubject.value.isAdmin;
  }

  public get currentUser(): User{
    //console.log(this.userSubject.value.token);
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastRService.success(
            `Welcome to FoodStore ${user.email}!`,
            'Login Successful'
          );
        },
        error: (errorResponse) => {
          this.toastRService.error(errorResponse.error, 'Login Failed');
        },
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastRService.success(
            `Welcome to FoodStore ${user.email}!`,
            'Registration Successful'
          );
        },
        error: (errorResponse) => {
          this.toastRService.error(errorResponse.error, 'Registration Failed');
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      
      return JSON.parse(userJson) as User;
    }
    return new User();
  }
}
