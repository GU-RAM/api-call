import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteMovieListComponent } from './favourite-movie-list.component';

describe('FavouriteMovieListComponent', () => {
  let component: FavouriteMovieListComponent;
  let fixture: ComponentFixture<FavouriteMovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteMovieListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
