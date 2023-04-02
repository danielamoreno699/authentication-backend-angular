import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
  })

  export class UserService{
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>

    constructor( private http: HttpClient){
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')  || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();

    }

    
   public get currentUserValue(): User{
    return this.currentUserSubject.value
 } 

 login(email: string, password: string){
    return this.http.post<User>('http://localhost:3000/users/login', {email, password})

        .pipe(map(user => {
              if(user && user.token){
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user)

              }
                return user 

        }))

 }

 logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
}



  } 