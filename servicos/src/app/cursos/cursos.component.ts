import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';
@Component({
  selector: 'cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
  providers: [CursosService]
})
export class CursosComponent implements OnInit {

  cursos : string [] = [];

  constructor(private cursosService: CursosService) {
    // this.cursosService = new CursosService();
  }

  //para gerar a lista de cursos é bom chamar o método getCursos no onInit
  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();

    // this.cursosService.emitirCursoCriado.subscribe(
    //  curso => console.log(curso)
    CursosService.criouNovoCurso.subscribe( curso => this.cursos.push(curso) 

    )}

}
