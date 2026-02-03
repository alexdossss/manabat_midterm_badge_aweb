import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data';
import { TruncatePipe } from '../about/truncate.pipe';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  searchTerm = '';
  search$ = new BehaviorSubject<string>('');
  error: string | null = null;
  loading = true;
  posts$;
  filteredPosts$;

  constructor(private dataService: DataService) {
    this.posts$ = this.dataService.getPosts().pipe(
      catchError(err => {
        this.error = 'Failed to load services.';
        this.loading = false;
        return of([]);
      })
    );

    this.filteredPosts$ = combineLatest([
      this.posts$,
      this.search$.pipe(startWith(''))
    ]).pipe(
      map(([posts, search]) => {
        this.loading = false;
        if (!search) return posts;
        const term = search.toLowerCase();
        return posts.filter(post =>
          post.title.toLowerCase().includes(term) ||
          post.body.toLowerCase().includes(term)
        );
      })
    );
  }
}
