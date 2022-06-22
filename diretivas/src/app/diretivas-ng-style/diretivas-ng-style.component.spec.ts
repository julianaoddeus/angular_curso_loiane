import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretivasNgStyleComponent } from './diretivas-ng-style.component';

describe('DiretivasNgStyleComponent', () => {
  let component: DiretivasNgStyleComponent;
  let fixture: ComponentFixture<DiretivasNgStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiretivasNgStyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretivasNgStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
