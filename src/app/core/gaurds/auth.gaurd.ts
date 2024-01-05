import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var user = "value";//get this value from session
        if (user != null) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url and return false
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
