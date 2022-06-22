import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretivas-ngfor',
  templateUrl: './diretivas-ng-for.component.html',
  styleUrls: ['./diretivas-ng-for.component.scss']
})
export class DiretivasNgForComponent implements OnInit {
  cursos : string[] = ['Angular', 'JavaScript', 'Java'];

  constructor() { }

  ngOnInit(): void {
  }

}
