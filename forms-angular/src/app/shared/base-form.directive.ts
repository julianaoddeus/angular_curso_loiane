import { Directive } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appDataForm]'
})
export abstract class BaseFormDirective {

  formulario!: FormGroup;

  constructor() { }

  abstract submit(): any;

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo)
      const controle = formGroup.get(campo);
      controle?.markAsDirty()
      controle?.markAsTouched()
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    })
  }
  resetar() {
    this.formulario.reset()
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.submit()
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidTouched(campo: any) {
    // return !campo.valid && campo.touched
    this.formulario.get(campo.hasError('required')&&
    (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty))
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  verificaEmailInvalido() {
    // if (this.formulario.get('email')) {
    //   return this.formulario.get('email')?.errors?.['email'] && this.formulario.get('email')?.touched
    const campoEmail = this.formulario.get('email')
    if(campoEmail?.errors){
      return campoEmail?.errors['email'] && campoEmail?.touched
    }

    }







}
