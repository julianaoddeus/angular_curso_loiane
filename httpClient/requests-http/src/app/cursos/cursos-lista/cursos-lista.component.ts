
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, Observable, of, Subject } from 'rxjs';
import { AlertModelComponent } from 'src/app/share/alert-model/alert-model.component';
import { CursosService } from '../cursos.service';
import { Curso } from './icursos';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,

})
export class CursosListaComponent implements OnInit {

  // cursos!: Curso[]
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  bsModalRef!: BsModalRef;

  constructor(
    private cursosService: CursosService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {

    this.onRefresh()
  }

  onRefresh() {
  //this.cursosService.list().subscribe(dados => this.cursos = dados);
    this.cursos$ = this.cursosService.list()
    .pipe( catchError(error => {
       console.log(error)
       //this.error$.next(true)
       this.handleError();
       return of()
      })
      )
  }

  handleError(){
    this.bsModalRef = this.modalService.show(AlertModelComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = ' Erro ao carregar cursos. Tente novamente mais tarde.';
  }

}
