import { Component, inject, signal } from '@angular/core';
import { PostComponent } from '../../shared/components/post/post.component';
import { Post } from '../../core/models/post.model';
import { Api } from '../../core/services/api.service';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from './components/pagination/pagination.component';

@Component({
  imports: [PostComponent, RouterLink, PaginationComponent],
  selector: 'app-posts',
  styleUrl: './posts.component.css',
  templateUrl: './posts.component.html',
})
export class PostsComponent {
  private api = inject(Api);
  posts = signal<Post[]>([]);
  page = signal(1);
  lastPage = signal(1);

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.getPosts(this.page()).subscribe({
      next: (posts) => {
        this.posts.set(posts.data);
        this.lastPage.set(posts.last_page);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  goToPage(page: number) {
    this.page.set(page);
    this.load();
  }
}
