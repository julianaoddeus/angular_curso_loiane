import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { catchError, Observable, of, Subject } from 'rxjs';
import { BsModalRef, BsModalService, } from 'ngx-bootstrap/modal';

import { Curso } from './cursos';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,

})
export class CursosListaComponent implements OnInit {


  deleteModalRef!: BsModalRef
  @ViewChild('deleteModal') deleteModal: any;
  // cursos!: Curso[]

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  cursoSelecionado!: Curso

  // bsModalRef!: BsModalRef;

  constructor(
    private cursosService: CursosService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private serviceModal: AlertModalService,
    private location: Location
    // private modalService: BsModalService
  ) { }

  ngOnInit() {

    this.onRefresh()
  }

  onRefresh() {
    //this.cursosService.list().subscribe(dados => this.cursos = dados);
    this.cursos$ = this.cursosService.list()
      .pipe(catchError(error => {
        console.log(error)
        //this.error$.next(true)
        this.handleError();
        return of()
      })
      )
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.')
    // this.bsModalRef = this.modalService.show(AlertModelComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = ' Erro ao carregar cursos. Tente novamente mais tarde.';
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route })
  }

  onDelete(curso: any) {
    this.cursoSelecionado = curso;
    const result$ = this.serviceModal.showConfirm('Confirmação', 'Tem certeza que deseja remover este curso?')
    result$.asObservable()
    .pipe(
      
    )
  }

  confirm(): void {
    this.cursosService.remove(this.cursoSelecionado.id).subscribe(
      success => {
        this.serviceModal.showAlertSuccess('Curso removido com sucesso!')
        this.location.back()
        this.onRefresh()
      },
    )
    this.deleteModalRef.hide();
  }

  decline(): void {
    this.deleteModalRef.hide();
  }
}
