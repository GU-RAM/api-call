import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallsService } from '../api-calls.service';
import { addMyMovie } from '../search.model';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss'],
})
export class MyMoviesComponent {
  stars: unknown[] = Array(10);

  createdMovieList$: Observable<addMyMovie[]> | undefined;

  constructor(private apiCallService: ApiCallsService) {}

  gur(mari: any) {
    console.log(Boolean(mari));
    Boolean(mari);
    return true;
  }

  ngOnInit() {
    this.createdMovieList$ = this.apiCallService.getCreateddMovie();
  }
}
