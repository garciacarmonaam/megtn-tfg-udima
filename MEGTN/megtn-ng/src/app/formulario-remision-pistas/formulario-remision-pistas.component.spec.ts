import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRemisionPistasComponent } from './formulario-remision-pistas.component';

describe('FormularioRemisionPistasComponent', () => {
  let component: FormularioRemisionPistasComponent;
  let fixture: ComponentFixture<FormularioRemisionPistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioRemisionPistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRemisionPistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
