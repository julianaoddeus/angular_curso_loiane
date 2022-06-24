import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  private verificarAcesso() {
    if (this.authService.usuarioEstaAutenticado()) {
      return true;
    }
    this.router.navigate(['/login']);

    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      console.log("AuthService")
    return this.verificarAcesso();

  }

  canLoad(route: Route): boolean | Observable<boolean> {
      console.log('Verificando carregamento segundo o acesso permitido')
      return this.verificarAcesso();
  }
}
