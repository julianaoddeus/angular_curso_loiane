import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { CidadesBr } from '../models/cidade';
import { EstadoBr } from '../models/estado-br';


@Injectable({
  providedIn: 'root'
})
export class DropdownService {


  constructor(private http: HttpClient) { }

  getEstadosBr(){
     return this.http.get<EstadoBr[]>('assets/dados/estadosBr.json').pipe(map((data) => data))

  }

  getCidades(idEstado:number){

    return this.http.get<CidadesBr[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: CidadesBr[])=> cidades.filter(c => c.estado === idEstado)))
  }


  getCargos(){
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'}

    ]
  }

  getTecnologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'Javascript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'ruby', desc: 'Ruby'}
    ]
  }

  getNewsLetter () {
    return [
      {valor: 's', desc: 'Sim'},
      {valor: 'n', desc: 'Não'},
    ]
  }


}


