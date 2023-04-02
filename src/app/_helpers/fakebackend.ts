
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { RouterLink } from "@angular/router";

import { delay, dematerialize, materialize, mergeMap, Observable, of, throwError } from "rxjs";
import { Role } from "../models/role";

//let users = JSON.parse(localStorage.getItem('users') || '{}'  ) 

const usersRole = [
    { id: 0, username: '', password: '', firstName: '', lastName: '', role: Role.Admin },
    { id: 0, username: '', password: '', firstName: '', lastName: '', role: Role.User }
];



@Injectable()
export class fakeBackEndInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        {
           const { url, method, headers , body} = req;

           return of(null)
                .pipe(mergeMap(handleRoute))
                .pipe (materialize())
                .pipe(delay(500))
                .pipe( dematerialize());


            function handleRoute(){
                switch(true){
                    case url.endsWith('/users/authentication') && method === 'POST':
                        return authregister();
                    default:
                         return next.handle(req)

                }
            }

            function authregister(){
                const usersRole = body

                if (usersRole.find((x: { username: any; }) => x.username === usersRole.username)){
                    return error('email " ' + usersRole.email + ' " is already taken')
                }

                usersRole.id = usersRole.length ? Math.max(... usersRole.map((x: { id: any; }) => x.id)) + 1 : 1;

               

                usersRole.push(usersRole);
                localStorage.setItem('users', JSON.stringify(usersRole));

                return ok({

                id: usersRole.id,
                username: usersRole.username,
                firstName: usersRole.firstName,
                lastName: usersRole.lastName,
                role: usersRole.role,
                token: `fake-jwt-token.${usersRole.id}`

                })
                
            }



            function getUsers() {
                if (!isAdmin()) return unauthorized();
                return ok();
            }

            

            function getUserById() {
                if (!isLoggedIn()) return unauthorized();
    
          
                if (!isAdmin() && currentUser()?.id !== idFromUrl()) return unauthorized();
    
                const users = usersRole.find(x => x.id === idFromUrl());
                return ok(users)
            }

            

            function unauthorized() {
                return throwError({ status: 401, error: { message: 'unauthorized' } })
                    .pipe(materialize(), delay(500), dematerialize()); 
            }

            function isAdmin() {
                return isLoggedIn() && currentUser()?.role == Role.Admin
            }

            

            
        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }


        function currentUser() {
            if (!isLoggedIn()) return;
            const id= parseInt(headers.get('Authorization')?.split('.')[1] || '')
            return usersRole.find(x => x.id === id);
        }


            function ok(body?: any){
                return of(new HttpResponse({status: 200, body}))
            }

            function error(message: string){
                return throwError({ error: {message}})
            }


            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
        }
    }
}







export const fakeBackEndProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass : fakeBackEndInterceptor,
    multi: true

};