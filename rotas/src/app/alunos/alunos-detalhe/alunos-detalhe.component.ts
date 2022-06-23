import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-alunos-detalhe',
  templateUrl: './alunos-detalhe.component.html',
  styleUrls: ['./alunos-detalhe.component.scss']
})
export class AlunosDetalheComponent implements OnInit, OnDestroy {

  aluno: any;
  inscricao!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private alunosService: AlunosService,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.inscricao = this.route.params.subscribe((params: any)=>
   {
    let id  = params['id'];
    this.aluno = this.alunosService.getAluno(id);
   });
  }

  ngOnDestroy(): void {
    if(this.inscricao){
      this.inscricao.unsubscribe();
    }
  }

  editarContato(){
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }


}
