import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCommentMovieComponent } from './rate-comment-movie.component';

describe('RateCommentMovieComponent', () => {
  let component: RateCommentMovieComponent;
  let fixture: ComponentFixture<RateCommentMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateCommentMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateCommentMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
