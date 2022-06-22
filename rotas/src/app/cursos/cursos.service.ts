import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  getCursos() {
    return [
      { id: 10, nome: 'Java' },
      { id: 11, nome: 'Angular' }
    ]
  }

  getCurso(id: number) {
    let cursos = this.getCursos();

    for (let curso of cursos) {
      if (curso.id == id) {
        return curso;
      }
    }
    return null;
  }

  constructor() { }

}
