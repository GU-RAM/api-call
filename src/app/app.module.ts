import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { API_URLS } from './token';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, MovieSearchComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: API_URLS, useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule {}
