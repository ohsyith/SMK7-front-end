import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxiooComponent } from './axioo.component';

describe('AxiooComponent', () => {
  let component: AxiooComponent;
  let fixture: ComponentFixture<AxiooComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AxiooComponent]
    });
    fixture = TestBed.createComponent(AxiooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
