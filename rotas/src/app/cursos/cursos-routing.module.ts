import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';


const cursosRoutes: Routes = [

  {path: '', component: CursosComponent},
  {path: 'naoEncontrado', component: CursoNaoEncontradoComponent}, //fixo hardcoded
  {path: ':id', component: CursoDetalheComponent},// rota /: nome do parâmetro

];

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
