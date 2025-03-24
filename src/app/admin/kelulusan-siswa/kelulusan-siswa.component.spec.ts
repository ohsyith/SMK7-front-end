import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KelulusanSiswaComponent } from './kelulusan-siswa.component';

describe('KelulusanSiswaComponent', () => {
  let component: KelulusanSiswaComponent;
  let fixture: ComponentFixture<KelulusanSiswaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KelulusanSiswaComponent]
    });
    fixture = TestBed.createComponent(KelulusanSiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
