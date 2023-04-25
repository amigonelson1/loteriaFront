import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoSorteoSemanalListComponent } from './resultado-sorteo-semanal-list.component';

describe('ResultadoSorteoSemanalListComponent', () => {
  let component: ResultadoSorteoSemanalListComponent;
  let fixture: ComponentFixture<ResultadoSorteoSemanalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoSorteoSemanalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoSorteoSemanalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
