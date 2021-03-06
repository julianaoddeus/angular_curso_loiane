import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { FormValidations } from './../form-validations';

@Component({
  selector: 'error-msg',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() label!: string;

  constructor() { }

  ngOnInit() {

  }

  get errorMessage(){
    if(this.control !== null){
      for(const propertyName in this.control.errors){
        if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
          return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
        }
    }
    return null;
  }
    }

}
