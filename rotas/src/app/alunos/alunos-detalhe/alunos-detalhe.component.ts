import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-alunos-detalhe',
  templateUrl: './alunos-detalhe.component.html',
  styleUrls: ['./alunos-detalhe.component.scss']
})
export class AlunosDetalheComponent implements OnInit {

  aluno: any;
  inscricao!: Subscription;
  constructor(private route: ActivatedRoute, private alunosService: AlunosService, private router: Router ) { }

  ngOnInit(): void {
    this.route.params.subscribe((queryParams: any)=>
   {
    this.aluno = queryParams['aluno'];

    this.aluno = this.alunosService.getAluno(this.aluno);

    if(this.aluno == null){
      this.router.navigate(['/naoEncontrado'])
    }
   });
  }

  ngOnDestroy(): void {
    if(this.inscricao){
      this.inscricao.unsubscribe();
    }

  }

}
