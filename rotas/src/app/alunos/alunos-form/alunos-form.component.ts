import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-alunos-form',
  templateUrl: './alunos-form.component.html',
  styleUrls: ['./alunos-form.component.scss']
})
export class AlunosFormComponent implements OnInit {

  aluno: any = {};
  inscricao!: Subscription;
  formMudou: boolean = false;

  constructor(private route: ActivatedRoute, private alunosService: AlunosService) { }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe((params: any) => {
      let id = params['id'];

      this.aluno = this.alunosService.getAluno(id);

      if (this.aluno == null) {
        this.aluno = {};
      }
    });
  }

  ngOnDestroy(): void {
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }


  onInput() {
    this.formMudou = true;
    console.log('Mudou');
  }


  podeMudarRota(): any {
    if (this.formMudou) {
      confirm('Tem certeza que deseja sair dessa página?');
    }
    return true;
  }

  podeDesativar(): any {
    return this.podeMudarRota();
  }



}
