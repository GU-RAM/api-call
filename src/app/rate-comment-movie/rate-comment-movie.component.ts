import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiCallsService } from '../api-calls.service';
import { Currency, Movie, SaveMovie } from '../search.model';

@Component({
  selector: 'app-rate-comment-movie',
  templateUrl: './rate-comment-movie.component.html',
  styleUrls: ['./rate-comment-movie.component.scss'],
})
export class RateCommentMovieComponent {
  favoriteMovieInfo: Movie | undefined;

  comment: string = '';

  constructor(
    private apiCallsService: ApiCallsService, // private toastr: ToastrService
    private toastr: ToastrService
  ) {
    this.favoriteMovieInfo = this.apiCallsService.favoriteMovie;
  }

  getCurrencies(currencies: Currency) {
    return Object.keys(currencies)[0];
  }

  addFavoriteMovie(movie: Movie, comment: string): any {
    return this.apiCallsService
      .saveMovie({ ...movie, Comment: comment })
      .subscribe(() => this.toastr.success('Movie has been added'));
  }

  ngOnInit() {
    console.log(this.favoriteMovieInfo);
  }
}
