import { Component, inject, signal } from '@angular/core';
import { Api } from '../../../../core/services/api.service';
import { Router } from '@angular/router';
import { Post } from '../../../../core/models/post.model';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-edit-post',
  styleUrl: './edit-post.component.css',
  templateUrl: './edit-post.component.html',
})
export class EditPostComponent {
  private api = inject(Api);
  private router = inject(Router);
  
  post = signal<Post | null>(history.state.post ?? null);
  authorName = signal(this.post()?.author_name ?? "");
  title = signal(this.post()?.title ?? "");
  body = signal(this.post()?.body ?? "");
  error = signal<Record<string, string>>({});
  save = signal(false);

  editPost() : void{
    if (!this.post()) {
      this.router.navigate(['/posts']);
      return;
    }

    this.error.set({});
    this.save.set(true);
    this.api.editPost(this.post()!.id,{authorName : this.authorName(), title : this.title(), body : this.body()}).subscribe({
      next : () => {
        this.save.set(false);
        this.router.navigate(['/posts']);
      },
      error : (error) => {
        console.log(error);
        this.save.set(false);
        this.error.set(error.error.errors);
      }
    });
  }
}
