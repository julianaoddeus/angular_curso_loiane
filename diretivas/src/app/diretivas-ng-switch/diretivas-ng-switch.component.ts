import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretivas-ngswitch',
  templateUrl: './diretivas-ng-switch.component.html',
  styleUrls: ['./diretivas-ng-switch.component.scss']
})
export class DiretivasNgSwitchComponent implements OnInit {

  aba: string = 'home';
  constructor() { }

  ngOnInit(): void {
  }

}
