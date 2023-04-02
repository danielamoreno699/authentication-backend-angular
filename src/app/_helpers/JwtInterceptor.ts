import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private UserService: UserService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.UserService.currentUserValue;

        if(currentUser  && currentUser.token){
            req = req.clone({
                setHeaders:{
                    Authotization: `Bearer ${currentUser.token}`
                }
            })
        }

        return next.handle(req)
    }


    }
