import {Component, Input, Optional} from '@angular/core';
import {NgForm, FormGroup, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'show-error',
  template: `
    <div *ngIf="errorMessages" class="alert alert-danger">
        <div *ngFor="let errorMessage of errorMessages">
            {{errorMessage}}
        </div>
    </div>` })
export class ShowErrorComponent {

  @Input('path') controlPath = '';
  @Input('text') displayName = '';

  private form: FormGroup;

  constructor(ngForm: NgForm) {
    this.form = ngForm.form;
  }

  get errorMessages(): string[] | null {
    const control = this.form.get(this.controlPath);
    if (!control || !(control.touched) || !control.errors) {
      return null;
    }
   return this.getDisplayMessages(control.errors);
  }

  private getDisplayMessages(errors: ValidationErrors): string[] {
    return Object.entries(errors).map(([errorCode, error]) => {
      switch (errorCode) {
        case 'required':
          return `${this.displayName} ist ein Pflichtfeld`;
        case 'minlength':
          return `${this.displayName} muss mindestens ${error.requiredLength} Zeichen enthalten`;
        case 'maxlength':
          return `${this.displayName} darf maximal ${error.requiredLength} Zeichen enthalten`;
        case 'invalidEMail':
          return `Bitte geben Sie eine gültige E-Mail-Adresse an`;
        case 'userNotFound':
          return `Der eingetragene Benutzer existiert nicht.`;
        default:
          return `${this.displayName} ist nicht valide`;
      }
    });
  }

}
