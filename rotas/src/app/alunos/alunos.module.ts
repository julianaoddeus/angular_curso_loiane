import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosService } from './alunos.service';
import { AlunosComponent } from './alunos.component';
import { AlunoRoutingModule } from './alunos-routing.modules';
import { AlunosFormComponent } from './alunos-form/alunos-form.component';
import { AlunosDetalheComponent } from './alunos-detalhe/alunos-detalhe.component';
import { AlunosDeactivateGuard } from '../guards/alunos-deactivate.guard';



@NgModule({

  declarations: [
    AlunosComponent,
    AlunosFormComponent,
    AlunosDetalheComponent,

  ],
  imports: [
    CommonModule,
    AlunoRoutingModule,
    FormsModule
  ],
  providers: [AlunosService, AlunosDeactivateGuard]
})
export class AlunosModule { }
