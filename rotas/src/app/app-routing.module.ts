import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { CursosGuard } from './guards/cursos.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AlunosGuard } from './guards/alunos.guard';



const routes: Routes = [

  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then((m) => m.CursosModule),
    canActivate : [AuthGuard],
    canActivateChild : [CursosGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then((m) => m.AlunosModule),
    canActivate : [AuthGuard],
    canActivateChild : [AlunosGuard],
    canLoad: [AuthGuard],
  },

  { path: 'login', component: LoginComponent },

  { path: '', component: HomeComponent , canActivate : [AuthGuard]},
  //{ path: '', component: HomeComponent , redirectTo: '/home'},
  //{ path: '', redirectTo:'/home', pathmatch: 'full'},

  {path: '**', component: PaginaNaoEncontradaComponent, canActivate : [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})], // para usar a hash e ficar compativel com a linguagem de back end
  exports: [RouterModule]
})
export class AppRoutingModule { }
