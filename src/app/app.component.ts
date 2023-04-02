import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { Role } from './models/role';
import { UserService } from './_services/user.service';
import { AuthenticationService } from './_services/authentication.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authentication';

  public user: User | undefined

  constructor(private userS: UserService, private auth: AuthenticationService){
      
      this.userS.currentUser.subscribe( x => this.user = x)


  }

  get isAdm(){
    return this.user && this.user.role === Role.Admin
  }


  

}
