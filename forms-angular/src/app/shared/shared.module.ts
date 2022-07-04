import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DropdownService } from './services/dropdown.service';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';







@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMessageComponent,
    InputFieldComponent,


   ],

  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule

  ],

  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMessageComponent,
    InputFieldComponent,



  ],

  providers: [DropdownService, ]
})
export class SharedModule { }
