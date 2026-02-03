import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  posts$!: Observable<Post[]>;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    if (!this.posts$) {
      this.posts$ = this.http.get<Post[]>(this.apiUrl)
        .pipe(shareReplay(1));
    }
    return this.posts$;
  }
}
