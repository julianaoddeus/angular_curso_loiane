import { IFormCanDeactivate } from './iform-candesactivate';
import { Injectable, Component } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlunosFormComponent } from '../alunos/alunos-form/alunos-form.component';

@Injectable({
  providedIn: 'root'
})
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate>{

  constructor(){}

  canDeactivate(
    component: IFormCanDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> |Promise<boolean>|  boolean {

      //return component.podeMudarRota();

      return component.podeDesativar();
  }
}
