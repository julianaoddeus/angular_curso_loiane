import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarValorService {

  //instaciar criar lógica para compartilhar de forma global (se um usuário logado ou não)
  private emissor$ = new Subject<string>();

  emitirValor(valor: string) {
    this.emissor$.next(valor);
  }

  //passa o valor mas mantem o método privado
  getValor() {
    return this.emissor$.asObservable();
  }

}
