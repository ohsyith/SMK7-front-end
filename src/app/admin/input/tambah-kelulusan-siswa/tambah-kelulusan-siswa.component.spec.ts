import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahKelulusanSiswaComponent } from './tambah-kelulusan-siswa.component';

describe('TambahKelulusanSiswaComponent', () => {
  let component: TambahKelulusanSiswaComponent;
  let fixture: ComponentFixture<TambahKelulusanSiswaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TambahKelulusanSiswaComponent]
    });
    fixture = TestBed.createComponent(TambahKelulusanSiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
