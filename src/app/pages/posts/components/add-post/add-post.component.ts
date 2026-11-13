import { Component, inject, signal } from '@angular/core';
import { Api } from '../../../../core/services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-add-post',
  styleUrl: './add-post.component.css',
  templateUrl: './add-post.component.html',
})
export class AddPostComponent {
  private api = inject(Api);
  private router = inject(Router);
  authorName = signal("");
  title = signal("");
  body = signal("");
  error = signal<Record<string, string>>({});
  save = signal(false);

  addPost() : void{
    this.error.set({});
    this.save.set(true);
    this.api.addPost({authorName : this.authorName(), title : this.title(), body : this.body()}).subscribe({
      next : () => {
        this.router.navigate(['/posts']);
      },
      error : (error) => {
        console.log(error);
        this.error.set(error.error.errors);
        this.save.set(false);
      }
    });
  }
}
