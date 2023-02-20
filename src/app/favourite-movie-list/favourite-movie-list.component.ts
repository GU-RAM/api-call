import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallsService } from '../api-calls.service';
import { SavedMovie } from '../search.model';

@Component({
  selector: 'app-favourite-movie-list',
  templateUrl: './favourite-movie-list.component.html',
  styleUrls: ['./favourite-movie-list.component.scss'],
})
export class FavouriteMovieListComponent {
  movieList$: Observable<SavedMovie[]> | undefined;

  constructor(public apiCallService: ApiCallsService) {}

  ngOnInit() {
    this.movieList$ = this.apiCallService.getSavedMovie();
  }
}
