import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretivas-ngclass',
  templateUrl: './diretivas-ng-class.component.html',
  styleUrls: ['./diretivas-ng-class.component.scss']
})
export class DiretivasNgClassComponent implements OnInit {

  meuFavorito: boolean = false;
  constructor() { }

  onMeuFavorito() {
    this.meuFavorito = !this.meuFavorito;
  }

  ngOnInit(): void {
  }

}
