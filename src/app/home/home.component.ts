import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  users: User[]= [];

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService, private router: Router) { 
      this.currentUser = this.userService.currentUserValue
    }

  ngOnInit(): void {
  }

  deleteUser(id: number) {
    this.authenticationService.delete(id)
        .pipe(first())
        .subscribe(() => this.loadAllUsers());
}

private loadAllUsers() {
    this.authenticationService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
}
  


}
