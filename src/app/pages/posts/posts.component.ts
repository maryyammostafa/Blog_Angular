import { Component, inject, signal } from '@angular/core';
import { PostComponent } from '../../shared/components/post/post.component';
import { Post } from '../../core/models/post.model';
import { Api } from '../../core/services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [PostComponent, RouterLink],
  selector: 'app-posts',
  styleUrl: './posts.component.css',
  templateUrl: './posts.component.html',
})
export class PostsComponent {
  private api = inject(Api);
  posts = signal<Post[]>([]);

  ngOnInit(): void {
    this.api.getPosts().subscribe({
      next: (posts) => {
        this.posts.set(posts);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
