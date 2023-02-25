import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { API_URLS } from './token';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThreeInputsSearchComponent } from './three-inputs-search/three-inputs-search.component';
import { AppRoutingModule } from './app.routing.module';
import { FavouriteMovieListComponent } from './favourite-movie-list/favourite-movie-list.component';
import { RateCommentMovieComponent } from './rate-comment-movie/rate-comment-movie.component';
import { MovieDetailsComponent } from './favourite-movie-list/movie-details/movie-details.component';
import { AddMovieFormComponent } from './add-movie-form/add-movie-form.component';
import { CountriesPipe } from './countries.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MovieSearchComponent,
    ThreeInputsSearchComponent,
    FavouriteMovieListComponent,
    RateCommentMovieComponent,
    MovieDetailsComponent,
    AddMovieFormComponent,
    CountriesPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [{ provide: API_URLS, useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule {}
