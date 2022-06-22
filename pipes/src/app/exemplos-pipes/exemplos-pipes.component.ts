import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.scss']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'Learning JavaScript Data Structures and Algorithms 2nd ed',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glqjpRP'
  }

  livros = ['Angular', 'Javascript']

  filtro: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  // parte do filtro de livros
  addLivro(value: string) {
    this.livros.push(value);
    console.log(this.livros)
  }

  // maneira correta de fazer filtro nos projetos. utlizando método
  obterLivros() {
    if (this.livros.length === 0 || this.filtro === undefined
      || this.filtro.trim() === '') {
      return this.livros;
    }

    return this.livros.filter((v) => {
      //retornar true caso fizer parte do filtro
      if (v.toLocaleLowerCase().indexOf(this.filtro.toLocaleLowerCase()) >= 0) {
        return true;
      }
      return false;
    });

  }

  //Trabalhando com promessa
  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor assíncrono'), 2000);
  });

  //trabalhando com Observable, com forma reativa
  valorAsync2 = new Observable(observer => {
    setInterval(() => observer.next('Valor assíncrono 2'),2000)
  });
}


