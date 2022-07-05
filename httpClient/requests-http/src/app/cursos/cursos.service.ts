import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from './cursos-lista/icursos';
import {delay, tap, take} from 'rxjs'

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

create(curso: string){
  return this.http.post(this.API, curso).pipe(take(1))
}


}
