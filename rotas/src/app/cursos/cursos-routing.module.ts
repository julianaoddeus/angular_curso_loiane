import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';


const cursosRoutes: Routes = [

  {path: 'cursos', component: CursosComponent},
  {path: 'curso/:id', component: CursoDetalheComponent},// rota /: nome do parâmetro
  {path: 'naoEncontrado', component: CursoNaoEncontradoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
