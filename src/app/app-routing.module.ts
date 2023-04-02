import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { Role } from './models/role';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  {path: 'admin', component: AdminComponent, canActivate:[AuthGuard],
  data: {roles:[Role.Admin]}


  },

  { path: '**', redirectTo: '' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
