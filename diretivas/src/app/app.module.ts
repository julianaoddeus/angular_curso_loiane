import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiretivasNgSwitchComponent } from './diretivas-ng-switch/diretivas-ng-switch.component';
import { DiretivasNgForComponent } from './diretivas-ng-for/diretivas-ng-for.component';
import { DiretivasNgifComponent } from './diretivas-ngif/diretivas-ngif.component';
import { DiretivasNgClassComponent } from './diretivas-ng-class/diretivas-ng-class.component';
import { DiretivasNgStyleComponent } from './diretivas-ng-style/diretivas-ng-style.component';
import { OperadorElvisComponent } from './operador-elvis/operador-elvis.component';
import { ExemploNgContentComponent } from './exemplo-ng-content/exemplo-ng-content.component';
import { FundoAmareloDirective } from './shared/fundo-amarelo.directive';
import { DiretivasCustomizadasComponent } from './diretivas-customizadas/diretivas-customizadas.component';
import { HighlightMouseDirective } from './shared/hilight-mouse.directive';
import { HighlightDirective } from './shared/highligh.directive';
import { NgElseDirective } from './shared/ng-else.directive';

@NgModule({
  declarations: [
    AppComponent,
    DiretivasNgifComponent,
    DiretivasNgSwitchComponent,
    DiretivasNgForComponent,
    DiretivasNgClassComponent,
    DiretivasNgStyleComponent,
    OperadorElvisComponent,
    ExemploNgContentComponent,
    FundoAmareloDirective,
    DiretivasCustomizadasComponent,
    HighlightMouseDirective,
    HighlightDirective,
    NgElseDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
