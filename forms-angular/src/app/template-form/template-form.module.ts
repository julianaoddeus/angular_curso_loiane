import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TemplateFormComponent } from './template-form.component';



@NgModule({
  declarations: [TemplateFormComponent,],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule

  ]
})
export class TemplateFormModule { }
