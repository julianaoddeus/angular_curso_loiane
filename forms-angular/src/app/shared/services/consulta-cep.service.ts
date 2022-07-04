import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {
  verificarEmail(value: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  consultaCEP(cep:string) {
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      const validacep = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/;
      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        return this.http.get(`https://viacep.com.br/ws/${cep}/json`)
      }
    }

  }

}
