import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EstadoBr } from '../shared/models/estado-br';
import { DropdownService } from './../shared/services/dropdown.service';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  // estados!: EstadoBr[];
  estados!: Observable<EstadoBr[]>

  cargos!: any [];

  tecnologias!: any [];

  newsLetterOp!: any[]

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService
  ) { }

  ngOnInit(): void {

    // this.dropDownService.getEstadosBr().subscribe((data: any) => { this.estados; console.log(data); });

    this.estados = this.dropDownService.getEstadosBr();

    this.cargos = this.dropDownService.getCargos();
    
    this.tecnologias = this.dropDownService. getTecnologias();

    this.newsLetterOp = this.dropDownService.getNewsLetter();

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

      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: [null]
    })
  }

  onSubmit() {
    if (this.formulario.valid) {

      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .subscribe((dados: any) => {
          console.log(dados)
          //resetar o formulario
          //this.resetar()
        })

    } else {
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
      if (controle instanceof FormGroup) {
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
    const cep = this.formulario.get('endereco.cep')?.value

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)?.subscribe(dados => this.populaDadoForm(dados))
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
