import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthServise } from '../services/auth.service';

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private auth: AuthServise,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        if (this.auth.isAuthenticated()) {
            return of(true)
        } else {
            this.router.navigate([''], {
                queryParams: {
                    accsesDenied: true
                }
            })
            return of(false)
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state)
    }

}