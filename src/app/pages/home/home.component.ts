import { Component, inject, signal } from '@angular/core';
import { PostComponent } from '../../shared/components/post/post.component';
import { Post } from '../../core/models/post.model';
import { Api } from '../../core/services/api.service';

@Component({
  imports: [PostComponent],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private api = inject(Api);
  posts = signal<Post[]>([]);
  page = signal(1);
  lastPage = signal(1);

  ngOnInit(): void {
    this.api.getPosts(this.page()).subscribe({
      next: (posts) => {
        this.posts.set(posts.data.filter(post => post.deleted_at === null).slice(0, 3));
        this.lastPage.set(posts.last_page);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  goToPage(page: number) {
    this.page.set(page);
  }
}
