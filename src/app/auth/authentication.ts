import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { isAuthenticated } from '../utils';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    if (!isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}