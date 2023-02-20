import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCallsService } from 'src/app/api-calls.service';
import { Movie } from 'src/app/search.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  @ViewChild('textarea') textarea: ElementRef | undefined;
  selectedMovie: Movie[] | undefined;
  selectedMovieId: string | number | undefined;

  constructor(
    private apiCallService: ApiCallsService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  deleteMovie(id: string | number) {
    return this.apiCallService.deleteSavedMovie(id).subscribe(() => {
      this.toastr.success('deleted succesfully'),
        (this.apiCallService.favoriteMoviesList$ =
          this.apiCallService.getSavedMovie());
    });
  }

  editComment(id: string | number) {
    this.selectedMovieId = id;
  }

  cancelEdit() {
    this.selectedMovieId = undefined;
  }

  fetchFavouriteMovie() {
    const favoriteMovieId = Number(this.activatedRoute.snapshot.params['id']);
    if (favoriteMovieId) {
      this.apiCallService.getSavedMovie().subscribe((movies: Movie[]) => {
        this.selectedMovie = movies.filter((movie: Movie) => {
          return movie.id === favoriteMovieId;
        });
      });
    }
  }

  updateComment(id: string | number, movie: Movie) {
    const Comment = this.textarea?.nativeElement.value;
    return this.apiCallService
      .updateComment(id, { ...movie, Comment })
      .subscribe(() => {
        this.toastr.success('updated succesfully'),
          (this.selectedMovieId = undefined);
        this.apiCallService.favoriteMoviesList$ =
          this.apiCallService.getSavedMovie();
        this.fetchFavouriteMovie();
      });
  }

  ngOnInit(): void {
    this.fetchFavouriteMovie();
  }
}
