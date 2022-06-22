import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretivasNgClassComponent } from './diretivas-ng-class.component';

describe('DiretivasNgClassComponent', () => {
  let component: DiretivasNgClassComponent;
  let fixture: ComponentFixture<DiretivasNgClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiretivasNgClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretivasNgClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
