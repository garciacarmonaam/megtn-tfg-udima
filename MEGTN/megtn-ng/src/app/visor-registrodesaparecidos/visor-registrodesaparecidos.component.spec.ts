import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorRegistrodesaparecidosComponent } from './visor-registrodesaparecidos.component';

describe('VisorRegistrodesaparecidosComponent', () => {
  let component: VisorRegistrodesaparecidosComponent;
  let fixture: ComponentFixture<VisorRegistrodesaparecidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisorRegistrodesaparecidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorRegistrodesaparecidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
