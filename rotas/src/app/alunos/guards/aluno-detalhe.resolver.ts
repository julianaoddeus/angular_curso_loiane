import { AlunosService } from './../alunos.service';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { Aluno } from '../aluno';

@Injectable()
export class AlunoDetalheResolver implements Resolve<Aluno> {

  constructor(private alunosService: AlunosService){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any>| Promise<any> | any{

    let id  = route.params['id'];
    return this.alunosService.getAluno(id);

  }

}
