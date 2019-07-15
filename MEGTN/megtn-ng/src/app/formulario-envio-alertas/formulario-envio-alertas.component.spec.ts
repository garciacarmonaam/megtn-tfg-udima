import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEnvioAlertasComponent } from './formulario-envio-alertas.component';

describe('FormularioEnvioAlertasComponent', () => {
  let component: FormularioEnvioAlertasComponent;
  let fixture: ComponentFixture<FormularioEnvioAlertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioEnvioAlertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioEnvioAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
