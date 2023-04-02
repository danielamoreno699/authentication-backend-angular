import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,private router: Router, private UserService: UserService, private alert: AlertService) {
    if(this.UserService.currentUserValue){
      this.router.navigate(['/'])
    }

    this.loginForm = {} as FormGroup;
    this.submitted = false;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
   }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
      });
      
  }

  onSubmit(){
    this.submitted = true
    this.alert.clear();

    if(this.loginForm.invalid){
      return; 
    }

    this.loading = true;
    this.UserService.login(this.userFormControls['email'].value, this.userFormControls['password'].value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl])
          }, error =>{
            this.alert.error(error);
            this.loading = false
          }
        )

  }

  get userFormControls(){
    return this.loginForm.controls;
  }



}
