import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loading = false;
  users: User[] = [];

  constructor(private userService: UserService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.loading = true;
    this.auth.getAll().pipe(first()).subscribe(users => {
        this.loading = false;
        this.users = users;
    });
}
  }


