import { Component, inject, input, output } from '@angular/core';
import { Post } from '../../../core/models/post.model';
import { DatePipe } from '@angular/common';
import { Api } from '../../../core/services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-post',
  styleUrl: './post.component.css',
  templateUrl: './post.component.html',
})
export class PostComponent {
  private api = inject(Api);

  post = input.required<Post>();
  operations = input(false);

  postDeleted = output<number>();
  postRestored = output<number>();
  postForceDeleted = output<number>();

  deletePost() : void{
    this.api.deletePost(this.post().id).subscribe({
      next : () => this.postDeleted.emit(this.post().id),
      error : (error) => console.log(error)
    });
  }

  restorePost(post: Post) : void{
    this.api.restorePost(post.id).subscribe({
      next : () => this.postRestored.emit(post.id),
      error : (error) => console.log(error)
    });
  }

  forceDeletePost(post: Post) : void{
    this.api.forceDeletePost(post.id).subscribe({
      next : () => this.postForceDeleted.emit(post.id),
      error : (error) => console.log(error)
    });
  }

}
