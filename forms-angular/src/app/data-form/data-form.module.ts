import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { SharedModule } from '../shared/shared.module';
import {DataFormComponent} from './data-form.component'



@NgModule({
  declarations: [
    DataFormComponent,

  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],

  providers: []
})
export class DataFormModule { }
