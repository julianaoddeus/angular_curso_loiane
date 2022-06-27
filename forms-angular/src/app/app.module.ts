
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { DataFormComponent } from './data-form/data-form.component';
import { TemplateFormModule } from './template-form/template-form.module';





@NgModule({
  declarations: [
    AppComponent,
    DataFormComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule,
    FormsModule,
    HttpClientModule,
    TemplateFormModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
