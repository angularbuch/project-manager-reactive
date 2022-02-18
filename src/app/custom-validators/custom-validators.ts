import {Directive, forwardRef} from '@angular/core';
import {
  FormControl,
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors
} from '@angular/forms';

export function asyncIfNotBacklogThenAssignee(control: FormControl): Promise<any> {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ifNotBacklogThanAssignee(control));
    }, 500);
  });
  return promise;
}

export function ifNotBacklogThanAssignee(formGroup: FormControl): {[key: string]: any } | null {
  const nameControl = formGroup.get('assignee.name');
  const stateControl = formGroup.get('state');
  if (!nameControl || !stateControl) {
    return null;
  }
  if (stateControl.value !== 'BACKLOG' &&
    (!nameControl.value || nameControl.value === '')) {
    return {'assigneeRequired': true};
  }
  return null;
}

@Directive({
  selector: '[ifNotBacklogThanAssignee]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IfNotBacklogThanAssigneeValidatorDirective, multi: true
    }]
})
export class IfNotBacklogThanAssigneeValidatorDirective {

  public validate(formGroup: AbstractControl): {[key: string]: any} | null {
    const nameControl = formGroup.get('assignee.name');
    const stateControl = formGroup.get('state');
    if (!nameControl || !stateControl) {
      return null;
    }
    if (stateControl.value !== 'BACKLOG' &&
      (!nameControl.value || nameControl.value === '')) {
      return {'assigneeRequired': true};
    }
    return null;
  }
}

@Directive({
  selector: '[emailValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailValidatorDirective, multi: true
  }]
})
export class EmailValidatorDirective {
  validate(control: AbstractControl): ValidationErrors | null {
    const re = /^[A-Za-z0-9._%+-]+@mycompany.com$/i;
    if (!control.value || control.value === '' || re.test(control.value)) {
      return null;
    } else {
      return {invalidEMail: true};
    }
  }
}

export function emailValidator(control: FormControl): {[key: string]: any} | null {
  return new EmailValidatorDirective().validate(control);
}

export function emailValidator2(control: FormControl): {[key: string]: any} | null {
  const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (!control.value || control.value === '' || re.test(control.value)) {
    return null;
  } else {
    return {'invalidEMail': true};
  }
}

@Directive({
  selector: '[emailValidator]',
  providers: [
    {provide: NG_VALIDATORS, useValue: emailValidator, multi: true}
  ]
})
export class EmailValidatorWithFunctionDirective {
}
