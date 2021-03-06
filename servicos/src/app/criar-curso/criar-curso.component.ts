import { ReceberCursoCriadoComponent } from './../receber-curso-criado/receber-curso-criado.component';
import { CursosService } from '../cursos/cursos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'criar-curso',
  templateUrl: './criar-curso.component.html',
  styleUrls: ['./criar-curso.component.scss'],
  providers: [CursosService]
})
export class CriarCursoComponent implements OnInit {

  cursos: string [] = [];
  
  constructor(private cursoService: CursosService) { }

  ngOnInit(): void {
    this.cursos = this.cursoService.getCursos();
  }

  onAddCurso(curso: string){
    this.cursoService.addCurso(curso);
  }

}
