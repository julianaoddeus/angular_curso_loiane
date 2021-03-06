import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.scss']
})
export class CursoDetalheComponent implements OnInit {

  id!: number;
  inscricao!: Subscription;
  curso: any;
  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private router: Router,
    ) {
    //this.id = this.route.snapshot.params['id'];//maneira de obter o código da rota

  }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(// maneira correta de obter o código da rota do parametro de rotas
      (params: any) => {
        this.id = params['id'];

        this.curso = this.cursosService.getCurso (this.id);

        if( this.curso == null){
          this.router.navigate(['cursos/naoEncontrado'])
        }
      }
    );
  }

  ngOnDestroy(): void {
    if(this.inscricao){
      this.inscricao.unsubscribe();

    }
  }
}
