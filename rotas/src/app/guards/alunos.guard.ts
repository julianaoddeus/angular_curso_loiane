import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunosGuard implements CanActivateChild{

  constructor(){}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
      console.log(route)
      console.log(state)
      return true
  }
}
