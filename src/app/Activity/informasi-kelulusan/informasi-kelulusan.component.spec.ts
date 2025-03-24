import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformasiKelulusanComponent } from './informasi-kelulusan.component';

describe('InformasiKelulusanComponent', () => {
  let component: InformasiKelulusanComponent;
  let fixture: ComponentFixture<InformasiKelulusanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformasiKelulusanComponent]
    });
    fixture = TestBed.createComponent(InformasiKelulusanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
