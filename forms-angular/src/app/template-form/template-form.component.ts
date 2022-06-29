import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = { nome: null, email: null };
  valor: string = '';

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
          ) { }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    console.log(form.value)
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .subscribe((dados: any) => console.log(dados))


  }


  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }


  consultaCEP(event: any, form: any) {
    this.valor = event.target.value;
    let cep = this.valor
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.resetaDadosForm(form)

        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => this.populaDadoForm(dados, form))

      }
    }
  }


  populaDadoForm(dados: any, formulario: any) {
    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     cep: dados.cep,
    //     numero: '',
    //     complemento: dados.complemento,
    //     rua: dados.logradouro,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf
    //   }
    // })

    formulario.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })

  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        cep: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })

  }
}
