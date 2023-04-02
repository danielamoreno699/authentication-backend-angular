import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading = false
  public userForm : FormGroup;
  public userDetails : User;
  public Submitted: boolean;
  public isUserRegistered : Boolean


  constructor(private formBuilder: FormBuilder, public UserService: UserService, public AuthService: AuthenticationService, private router: Router, private alert: AlertService) { 


    if(this.UserService.currentUserValue){
      this.router.navigate(['/'])
    }
    this.userForm = {} as FormGroup;
    this.userDetails = {} as User;
    this.Submitted = false;
    this.isUserRegistered = true

  }



  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get userFormControls(){
    return this.userForm.controls;
  }

  public onSubmit(){
    this.Submitted =true

        this.alert.clear();

        if(this.userForm.invalid){
          return;
        }

      this.loading = true;
      this.AuthService.sendFormDetails(this.userForm.value)
      .pipe(first())
      .subscribe(
          data => {
            this.alert.success('Registration succesful', true);
            this.router.navigate(['/login-user'])
          },
          error =>{
            this.alert.error(error);
            this.loading = false
} );

}
  





}
