import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElementGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      localStorage.getItem('token') != null &&
      localStorage.getItem('user') != null
    ) {
      let user = JSON.parse(localStorage.getItem('user') || '');
      if (user.userType == 'Administrator' || user.userType == 'Worker') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
