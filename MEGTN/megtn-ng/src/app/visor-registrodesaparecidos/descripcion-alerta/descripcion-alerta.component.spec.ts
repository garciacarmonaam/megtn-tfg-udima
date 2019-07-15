import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionAlertaComponent } from './descripcion-alerta.component';

describe('DescripcionAlertaComponent', () => {
  let component: DescripcionAlertaComponent;
  let fixture: ComponentFixture<DescripcionAlertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescripcionAlertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripcionAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
