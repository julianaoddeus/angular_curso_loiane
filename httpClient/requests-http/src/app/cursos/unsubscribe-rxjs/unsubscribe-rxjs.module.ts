import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PocBaseComponent } from './poc-base/poc-base.component';

import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';
import { PocComponent } from './componentes/poc.component';
import { PocAsyncComponent } from './componentes/poc-async.component';
import { PocTakeUntilComponent } from './componentes/poc-take-until.component';
import { PocTakeComponent } from './componentes/poc-take.component';
import { PocUnsubComponent } from './componentes/poc-unsub.component';
import { UnsubscribeRxjsRoutingModule } from './unsubscribe-rxjs.routing';




@NgModule({
  declarations: [
    UnsubscribePocComponent,
    PocComponent,
    PocAsyncComponent,
    PocTakeUntilComponent,
    PocTakeComponent,
    PocUnsubComponent,
    PocBaseComponent
  ],

  imports: [
    CommonModule,
    UnsubscribeRxjsRoutingModule
  ]
})
export class UnsubscribeRxjsModule { }

