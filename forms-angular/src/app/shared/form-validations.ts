import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})

export class FormValidations {

  static requiredMinCheckBox(min = 1) {
    const validator = (formArray: AbstractControl) => {
      if (formArray instanceof FormArray) {
        const totalChecked = formArray.controls.map(v => v.value)
          .reduce((total: number, atual: number) => (atual ? total + atual : total), 0);
        return totalChecked >= min ? null : { required: ' true' };
      }
      throw new Error('formArray is not an instance of FormArray');
    };
    return validator;
  }


  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      const validaCep =/^([\d]{2})\.*([\d]{3})-*([\d]{3})/;
      return validaCep.test(cep) ? null : { cepInvalido: true }
    }

    return null;
  }

  static equalsTo(otherField: string){
    const validator: ValidatorFn = (formControl: AbstractControl) => {
        if (formControl instanceof FormControl) {
            if (otherField == null){
                throw new Error('É necessário informar um campo.');
            }
            // Colocamos essa validação abaixo para sabermos se o Angular já preparou esses
            // componentes na renderização. Muitas vezes o objeto vem null por esse motivo,
            // ou seja, as vezes o Angular precisa de um tempinho a mais.
            if (!formControl.root || !(<FormGroup>formControl.root).controls){
                return null;
            }
            // Também poderíamos utilizar a propriedade .parent do formControl,
            // porém, para garantir, vamos utilziar a root (raiz).

            const field = (<FormGroup>formControl.root).get(otherField);

            if (!field){
                throw new Error('É necessário informar um campo válido.');
            }

            if (field.value !== formControl.value){
                // Aqui a validação propriamente feita, onde se não forem iguais, retornamos um erro.
                // Precisamos retornar um objeto com a propriedade de erro com seu nome, no caso
                // usamos o nome sendo equalsTo.
                return { equalsTo: otherField };
            }

            return null;
        }
        throw new Error('formControl não é uma instância de FormControl');
    };
    return validator;
}

static getErrorMsg(fieldName: string, validatorName: string, validatorValue?:any){
  const config :{[id: string]: string} = {
    'required': `${fieldName} é obrigatório.`,
    'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredMinLength} caracteres.`,
    'cepInvalido': 'cep inválido!',
    'emailInvalido': 'email já cadastrado.',
    'equalsTo': 'os campos precisam ser iguais.',
    'pattern': 'campo inválido!'

  };
  return config[validatorName];
}

}
