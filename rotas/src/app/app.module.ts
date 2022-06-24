import { AlunoDetalheResolver } from './alunos/guards/aluno-detalhe.resolver';
import { AlunosDeactivateGuard } from './guards/alunos-deactivate.guard';
import { CursosGuard } from './guards/cursos.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AlunosGuard } from './guards/alunos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

//import { CursosModule } from './cursos/cursos.module';
//import { AlunosModule } from './alunos/alunos.module';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //CursosModule,
    //AlunosModule

  ],
  providers: [AuthService, AuthGuard, CursosGuard, AlunosGuard, AlunosDeactivateGuard, AlunoDetalheResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
