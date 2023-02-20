import { Component, Input } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import { Currency, SavedMovie } from '../search.model';

@Component({
  selector: 'app-rate-comment-movie',
  templateUrl: './rate-comment-movie.component.html',
  styleUrls: ['./rate-comment-movie.component.scss'],
})
export class RateCommentMovieComponent {
  favoriteMovieInfo: SavedMovie | undefined;

  comment: string = '';

  constructor(private apiCallsService: ApiCallsService) {
    this.favoriteMovieInfo = this.apiCallsService.favoriteMovie;
  }

  getCurrencies(currencies: Currency) {
    return Object.keys(currencies)[0];
  }

  addFavoriteMovie(movie: SavedMovie, comment: string) {
    this.apiCallsService
      .saveMovie({ ...movie, Comment: comment })
      .subscribe(() => console.log());
  }

  ngOnInit() {
    console.log(this.favoriteMovieInfo);
  }
}
