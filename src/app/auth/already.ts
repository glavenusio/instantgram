import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { isAuthenticated } from '../utils';

@Injectable()
export class AlreadyAuthenticated implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    if (isAuthenticated()) {
      this.router.navigate(['tabs/profile']);
      return false;
    }
    return true;
  }
}