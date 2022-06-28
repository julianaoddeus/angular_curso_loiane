import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DropdownService } from './../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { map } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  estados!: EstadoBr[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService
  ) { }

  ngOnInit(): void {

    this.dropDownService.getEstadosBr().subscribe((data: any) => { this.estados; console.log(data); });

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],

      })
    })
  }

  onSubmit() {
    if(this.formulario.valid){

      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe((dados: any) => {
        console.log(dados)
        //resetar o formulario
        //this.resetar()
      })

    }else {
      console.log('formlario invalido')
      this.verificaValidacoesForm(this.formulario);
    }
  }

  //tusando a recursividade
  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo)
      const controle = formGroup.get(campo)
      controle?.markAsTouched()
      if(controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }
    })
  }
  resetar() {
    this.formulario.reset()
  }


  verificaValidTouched(campo: string) {
    return this.formulario.get(campo)?.errors?.['required'] && (this.formulario.get(campo)?.touched)
  }


  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  verificaEmailInvalido() {
    if (this.formulario.get('email')) {
      return this.formulario.get('email')?.errors?.['email'] && this.formulario.get('email')?.touched

    }

  }

  consultaCEP() {

    let cep = this.formulario.get('endereco.cep')?.value
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.resetaDadosForm()

        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => this.populaDadoForm(dados))

      }
    }
  }

  populaDadoForm(dados: any) {
    this.formulario.patchValue({
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
  resetaDadosForm() {
    this.formulario.patchValue({
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
