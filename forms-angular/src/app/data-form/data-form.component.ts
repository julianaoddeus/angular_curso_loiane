import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap, map, distinctUntilChanged, mergeMap, switchMap, of } from 'rxjs';



import { EstadoBr } from '../shared/models/estado-br';
import { CidadesBr } from '../shared/models/cidade';
import { FormValidations } from '../shared/form-validations';
import { DropdownService } from '../shared/services/dropdown.service';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { VerificaEmailService } from './services/verifica-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;

  estados!: EstadoBr[];
  //estados!: Observable<EstadoBr[]>
  cidades!: CidadesBr[]

  cargos!: any[];

  tecnologias!: any[]

  newsLetterOp!: any[]

  frameworks: string[] = ['Angular', 'React', 'Vue', 'Sencha']

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService,
    private emailService: VerificaEmailService
  ) {

  }

  convertControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  ngOnInit(): void {

    //this.dropDownService.getEstadosBr().subscribe((data: any) => { this.estados; console.log(data); });

    // this.emailService.verificarEmail('email1@email.com').subscribe();

    //this.estados = this.dropDownService.getEstadosBr();
    this.dropDownService.getEstadosBr().subscribe(dados => this.estados = dados);

    this.cargos = this.dropDownService.getCargos();

    this.tecnologias = this.dropDownService.getTecnologias();

    this.newsLetterOp = this.dropDownService.getNewsLetter();



    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
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

    //alterando o a forma de escutar mudanças de evendo no html
    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value))
      ).subscribe(status => {
        if (status === 'VALID') {
          this.cepService.consultaCEP(this.formulario.get('endereco.cep')?.value)
            ?.subscribe(dados => this.populaDadoForm(dados)) // objeto nulo
        }
      })

      this.formulario.get('endereco.estado')?.valueChanges
      .pipe(
        tap(estado => console.log('Novo estado',estado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : of()),
        switchMap((estadoId:any) => this.dropDownService.getCidades(estadoId)),
        tap(console.log)
      ).subscribe(cidades => this.cidades = cidades)
  }




  buildFrameworks() {

    const values = this.frameworks.map(v => new FormControl(false))
    return this.formBuilder.array(values, FormValidations.requiredMinCheckBox(1));
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

  //usando a recursividade
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


  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched
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

  validarEmail(formControl: FormControl) {
    //operação para retornar nulo ou um objeto
    return this.emailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null))
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

  // setarTecnologias() {
  //   this.formulario.get('tecnologias') .setValue(['java', 'javascript', 'php']);
  // }

  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }



}




