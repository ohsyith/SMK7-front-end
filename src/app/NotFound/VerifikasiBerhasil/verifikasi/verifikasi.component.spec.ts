import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifikasiComponent } from './verifikasi.component';

describe('VerifikasiComponent', () => {
  let component: VerifikasiComponent;
  let fixture: ComponentFixture<VerifikasiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifikasiComponent]
    });
    fixture = TestBed.createComponent(VerifikasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
