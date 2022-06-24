import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';
import { AlunosDeactivateGuard } from './../guards/alunos-deactivate.guard';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AlunosComponent } from "./alunos.component";
import { AlunosFormComponent } from "./alunos-form/alunos-form.component";
import { AlunosDetalheComponent } from "./alunos-detalhe/alunos-detalhe.component";


const alunosRoutes: Routes = [
  //rotas declaradas
  /*
  { path: 'alunos', component: AlunosComponent},
  { path: 'alunos/novo', component: AlunosFormComponent}, //hardedCode
  { path: 'alunos/:id', component: AlunosDetalheComponent}, //
  { path: 'alunos/:id/editar', component: AlunosFormComponent},
  */

  //usando rotas filhas --
  {
    path: '', component: AlunosComponent,
    children: [
      { path: 'novo', component: AlunosFormComponent }, //hardedCode
      { path: ':id', component: AlunosDetalheComponent,
        resolve: { aluno : AlunoDetalheResolver}
      }, //
      { path: ':id/editar', component: AlunosFormComponent,
            canDeactivate: [AlunosDeactivateGuard],
    }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule]
})

export class AlunoRoutingModule { }
