import { ShareModule } from './share/share.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UnsubscribeRxjsModule } from './cursos/unsubscribe-rxjs/unsubscribe-rxjs.module';



@NgModule({
  declarations: [
    AppComponent,


   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UnsubscribeRxjsModule,
    ModalModule.forRoot(),
    ShareModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
