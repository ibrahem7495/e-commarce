import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavigathionComponent } from './main-navigathion.component';

describe('MainNavigathionComponent', () => {
  let component: MainNavigathionComponent;
  let fixture: ComponentFixture<MainNavigathionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNavigathionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavigathionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
