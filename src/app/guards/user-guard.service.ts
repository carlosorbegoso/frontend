import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {
  realRol: string;
  constructor(private tokenService: TokenService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    console.log(expectedRol);
    const roles = this.tokenService.getAuthorities();
    this.realRol = 'user';
    roles.forEach(rol => {
      switch (rol) {
        case 'ROLE_ADMIN': this.realRol = 'admin'
          break;
        case 'ROLE_USER': this.realRol = 'user'
          break;
        default:
          break;
      }
      // if (rol === 'ROLE_ADMIN') {
      //   this.realRol = 'admin';
      // }
    });
    if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1) {
      this.router.navigate(['/']);

      return false;
    }
    return true;
  }
}
