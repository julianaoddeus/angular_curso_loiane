import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretivas-ngstyle',
  templateUrl: './diretivas-ng-style.component.html',
  styleUrls: ['./diretivas-ng-style.component.scss']
})
export class DiretivasNgStyleComponent implements OnInit {

  ativo: boolean = false;
  tamanhoDaFonte: number = 10;
  constructor() { }

  ngOnInit(): void {
  }

  onMudarAtivo() {
    this.ativo = !this.ativo;
  }
}
