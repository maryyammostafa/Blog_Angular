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

  ngOnInit(): void {
    this.api.getPosts().subscribe({
      next: (posts) => {
        this.posts.set(posts
          .filter(post => !post.deleted_at)
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 3)
        );
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
