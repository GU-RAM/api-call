import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs';
import { ApiCallsService } from 'src/app/api-calls.service';
import { Movie, SavedMovie } from 'src/app/search.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  @ViewChild('textarea') textarea: ElementRef | undefined;
  selectedMovie: any;
  selectedMovieId: string | undefined;

  constructor(
    private apiCallService: ApiCallsService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  deleteMovie(id: string) {
    return this.apiCallService.deleteSavedMovie(id).subscribe(() => {
      this.toastr.success('deleted succesfully'),
        (this.apiCallService.favoriteMoviesList$ =
          this.apiCallService.getSavedMovie());
    });
  }

  editComment(id: string) {
    this.selectedMovieId = id;
  }

  cancelEdit() {
    this.selectedMovieId = undefined;
  }

  updateComment(id: string, movie: SavedMovie) {
    const Comment = this.textarea?.nativeElement.value;
    return this.apiCallService
      .updateComment(id, { ...movie, Comment })
      .subscribe(() => {
        this.toastr.success('updated succesfully'),
          (this.selectedMovieId = undefined);
        this.apiCallService.favoriteMoviesList$ =
          this.apiCallService.getSavedMovie();
      });
  }

  ngOnInit(): void {
    const favoriteMovieId = Number(this.activatedRoute.snapshot.params['id']);
    if (favoriteMovieId) {
      this.apiCallService.getSavedMovie().subscribe((movies: SavedMovie) => {
        const moviesArray = Object.values(movies);
        this.selectedMovie = moviesArray.filter((movie: SavedMovie) => {
          return movie.id === favoriteMovieId;
        });
      });
    }
  }
}
