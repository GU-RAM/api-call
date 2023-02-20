import { Component } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import { SavedMovie } from '../search.model';

@Component({
  selector: 'app-favourite-movie-list',
  templateUrl: './favourite-movie-list.component.html',
  styleUrls: ['./favourite-movie-list.component.scss'],
})
export class FavouriteMovieListComponent {
  constructor(public apiCallService: ApiCallsService) {
    this.apiCallService.favoriteMoviesList$;
  }

  ngOnInit() {
    this.apiCallService.getSavedMovie().subscribe((movies: SavedMovie[]) => {
      this.apiCallService.favoriteMoviesList$ = movies;
    });
  }
}
