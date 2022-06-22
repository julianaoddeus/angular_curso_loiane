import { Component } from '@angular/core';

@Component({
  selector: 'app-diretivas-ngif',
  templateUrl: './diretivas-ngif.component.html',
  styleUrls: ['./diretivas-ngif.component.scss']
})
export class DiretivasNgifComponent  {

  cursos: string[] = ['Angular/cli'];
  mostrarCursos: boolean = false;

  constructor() { }

  OnMostrarCursos(){
    this.mostrarCursos = !this.mostrarCursos;
  }

}
