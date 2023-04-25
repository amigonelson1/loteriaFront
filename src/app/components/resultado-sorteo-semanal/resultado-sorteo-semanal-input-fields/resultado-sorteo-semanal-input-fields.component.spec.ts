import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoSorteoSemanalInputFieldsComponent } from './resultado-sorteo-semanal-input-fields.component';

describe('ResultadoSorteoSemanalInputFieldsComponent', () => {
  let component: ResultadoSorteoSemanalInputFieldsComponent;
  let fixture: ComponentFixture<ResultadoSorteoSemanalInputFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoSorteoSemanalInputFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoSorteoSemanalInputFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
