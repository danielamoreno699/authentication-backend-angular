import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../_services/user.service';

@Injectable()



export class ErrorInterceptor  implements HttpInterceptor{
    constructor(private UserService: UserService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
               
                this.UserService.logout();
                location.reload();
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}