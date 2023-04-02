import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../_environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public sendFormDetails (formData: User): Observable <User>{
    return this.http.post<User>(`${environment.apiUrl}/users/authentication`, formData)
  }

  getAll(){
    return this.http.get<User[]>(`${environment.apiUrl}/users/`);
  }

  delete( id: number){
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
 }





}
