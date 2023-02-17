import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeInputsSearchComponent } from './three-inputs-search.component';

describe('ThreeInputsSearchComponent', () => {
  let component: ThreeInputsSearchComponent;
  let fixture: ComponentFixture<ThreeInputsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeInputsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeInputsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
