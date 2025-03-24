import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKelulusanSiswaComponent } from './edit-kelulusan-siswa.component';

describe('EditKelulusanSiswaComponent', () => {
  let component: EditKelulusanSiswaComponent;
  let fixture: ComponentFixture<EditKelulusanSiswaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditKelulusanSiswaComponent]
    });
    fixture = TestBed.createComponent(EditKelulusanSiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
