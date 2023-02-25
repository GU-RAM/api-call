import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieFormComponent } from './add-movie-form/add-movie-form.component';
import { FavouriteMovieListComponent } from './favourite-movie-list/favourite-movie-list.component';
import { MovieDetailsComponent } from './favourite-movie-list/movie-details/movie-details.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { RateCommentMovieComponent } from './rate-comment-movie/rate-comment-movie.component';
import { ThreeInputsSearchComponent } from './three-inputs-search/three-inputs-search.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MovieSearchComponent,
  },
  {
    path: 'create-your-movie',
    component: AddMovieFormComponent,
  },
  {
    path: 'rate-comment-add',
    component: RateCommentMovieComponent,
  },
  {
    path: 'population',
    component: ThreeInputsSearchComponent,
  },
  {
    path: 'favourite-movie-list',
    component: FavouriteMovieListComponent,
  },
  {
    path: 'favourite-movie-list/:id',
    component: MovieDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
