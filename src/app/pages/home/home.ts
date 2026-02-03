import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  posts$;

  constructor(private dataService: DataService) {
    this.posts$ = this.dataService.getPosts().pipe(
      map(posts => posts.slice(0, 5))
    );
  }
}
