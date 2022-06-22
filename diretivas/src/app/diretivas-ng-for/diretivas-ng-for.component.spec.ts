import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretivasNgForComponent } from './diretivas-ng-for.component';

describe('DiretivasNgForComponent', () => {
  let component: DiretivasNgForComponent;
  let fixture: ComponentFixture<DiretivasNgForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiretivasNgForComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretivasNgForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
