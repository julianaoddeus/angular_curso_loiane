import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

import { EstadoBr } from '../shared/models/estado-br';
import { DropdownService } from './../shared/services/dropdown.service';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { FormValidations } from '../shared/form-validations';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  // estados!: EstadoBr[];
  estados!: Observable<EstadoBr[]>

  cargos!: any[];

  tecnologias!: any[];

  newsLetterOp!: any[]

  frameworks: string[] = ['Angular', 'React', 'Vue', 'Sencha']

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService
  ) { }

  ngOnInit(): void {

    //this.dropDownService.getEstadosBr().subscribe((data: any) => { this.estados; console.log(data); });

    this.estados = this.dropDownService.getEstadosBr();

    this.cargos = this.dropDownService.getCargos();

    this.tecnologias = this.dropDownService.getTecnologias();

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
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    })
  }

  buildFrameworks() {

    const values = this.frameworks.map(v => new FormControl(false))
    return this.formBuilder.array(values, this.requiredMinCheckBox(1));
  }

  requiredMinCheckBox(min =1){
    const validator = (formArray: AbstractControl) => {
      if(formArray instanceof FormArray){
        const totalChecked = formArray.controls.map(v => v.value)
          .reduce((total: number, atual: number) => (atual ? total + atual : total), 0);
        return totalChecked >= min ? null : {required:true};
      }
      throw new Error('formArray is not an instance of FormArray');
    };
    return validator;
  }


  onSubmit() {

    console.log(this.formulario)
    let valueSubmit = Object.assign({}, this.formulario.value)

    //trocando o nome de true para o valor dentro do campo || imutabilidade
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => v ? this.frameworks[i] : null)
        .filter((v: any) => v !== null)
    })

    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
        .subscribe((dados: any) => {
          console.log(dados)
          //resetar o formulario
          //this.resetar()
        })

    } else {
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


