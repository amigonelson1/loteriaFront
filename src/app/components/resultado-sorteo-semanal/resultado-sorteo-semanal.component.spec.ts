import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoSorteoSemanalComponent } from './resultado-sorteo-semanal.component';

describe('ResultadoSorteoSemanalComponent', () => {
  let component: ResultadoSorteoSemanalComponent;
  let fixture: ComponentFixture<ResultadoSorteoSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoSorteoSemanalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoSorteoSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
