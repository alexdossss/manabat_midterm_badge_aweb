import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data';
import { TruncatePipe } from './truncate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  posts$;
  today = new Date();

  constructor(private dataService: DataService) {
    this.posts$ = this.dataService.getPosts();
  }
}
