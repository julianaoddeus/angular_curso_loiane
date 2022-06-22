import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretivascustomizadas',
  templateUrl: './diretivas-customizadas.component.html',
  styleUrls: ['./diretivas-customizadas.component.scss']
})
export class DiretivasCustomizadasComponent implements OnInit {

  mostrarCursos: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  OnMostrarCursos(){
    this.mostrarCursos = !this.mostrarCursos;
  }

}
