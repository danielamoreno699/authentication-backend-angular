import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private UserService: UserService      
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {      
        const currentUser = this.UserService.currentUserValue;

        if (currentUser) {
           
            return true;
        }
        
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}