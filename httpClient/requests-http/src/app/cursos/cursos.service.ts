import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from './cursos-lista/cursos';
import { delay, tap, take } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  //recarregar curso
  list() {
    return this.http.get<Curso[]>(this.API).pipe(
      delay(1000),
      tap(console.log)
    ) //API restfull

  }
  // vai no bd e busca o id
  loadById(id:number) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1)) // usando o pipe take para encerrar, faz apenas uma requisição
  }

  private create(curso: { id: any; }) {
    return this.http.post(this.API, curso).pipe(take(1))
  }

   private update(curso: { id: any; }){
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1))
  }

  save(curso: { id: any; }) {
    if(curso.id){
      return this.update(curso)
    }
    return this.create(curso)
  }

  remove(id: number){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1))
  }
}
