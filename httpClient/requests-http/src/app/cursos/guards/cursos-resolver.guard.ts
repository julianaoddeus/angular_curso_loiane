import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,  Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Curso } from '../cursos-lista/cursos';
import { CursosService } from '../cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursosResolverGuard  implements Resolve<Curso>{

  constructor(private cursoService: CursosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> {

    if (route.params && route.params['id']) {
      return this.cursoService.loadById(route.params['id'])
    }
    return of();

  }

}
