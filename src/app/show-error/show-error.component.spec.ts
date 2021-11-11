
import { TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ShowErrorComponent } from './show-error.component';

export class FakeForm {
  constructor(private control: any) {
  }

  get(str: string) {
    return this.control;
  }
}

describe('ShowError Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [FormsModule, ReactiveFormsModule],
      declarations: [ShowErrorComponent],
      providers: [NgForm]
    });
  });


  it('should display "required" error for touched controls', async() => {
    const fixture = TestBed.createComponent(ShowErrorComponent);
    await fixture.whenStable();
    const showErrorCmp: ShowErrorComponent = fixture.componentInstance;
    const element = fixture.nativeElement;
    (<any>showErrorCmp).form = new FakeForm({
      touched: true,
      errors: {
        required: true
      }
    });
    (<any>showErrorCmp).displayName = 'Vorname';
    fixture.detectChanges(); //Change-Detection auslösen
    expect(element.querySelector('.alert-danger').textContent)
      .toContain('Vorname ist ein Pflichtfeld');
  });

  it('should display no errors for untouched controls', () => {
    const fixture = TestBed.createComponent(ShowErrorComponent);
    const showErrorCmp: ShowErrorComponent = fixture.componentInstance;
    const fakeControl: any = {touched: false, errors: {required: true}};
    (<any>showErrorCmp).form = new FakeForm(fakeControl);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alert-danger')).toBeNull();
    expect(fixture.debugElement.query(By.css('.alert-danger'))).toBeNull();
  });
});





