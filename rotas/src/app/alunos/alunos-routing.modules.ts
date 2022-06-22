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
    path: 'alunos', component: AlunosComponent,
    children: [
      { path: 'novo', component: AlunosFormComponent }, //hardedCode
      { path: ':id', component: AlunosDetalheComponent }, //
      { path: ':id/editar', component: AlunosFormComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule]
})

export class AlunoRoutingModule { }
