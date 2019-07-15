import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaLugarDesaparicionComponent } from './mapa-lugar-desaparicion.component';

describe('MapaLugarDesaparicionComponent', () => {
  let component: MapaLugarDesaparicionComponent;
  let fixture: ComponentFixture<MapaLugarDesaparicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaLugarDesaparicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaLugarDesaparicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
