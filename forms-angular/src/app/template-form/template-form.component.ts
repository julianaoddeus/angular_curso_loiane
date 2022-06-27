import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';



@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = { nome: null, email: null };
  valor: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    console.log(form.value)
    console.log(this.usuario)
  }

  verificaValidTouched(campo: any): boolean {
    return !campo.valid && campo.touched
  }
  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }


  consultaCEP(event: any, form : any) {
    this.valor = event.target.value;
    let cep = this.valor
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        this.http.get(`https://viacep.com.br/ws/13386036/json`)
          .subscribe(dados => this.populaDadoForm(dados, form))
      }
    }
  }

  populaDadoForm(dados: any, form: any) {
    form.setValue({
      nome: form.value.nome,
      email: form.value.email,
      endereco: {
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }
}
