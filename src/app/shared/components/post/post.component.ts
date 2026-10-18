import { Component, inject, Input, output } from '@angular/core';
import { Post } from '../../../core/models/post.model';
import { DatePipe } from '@angular/common';
import { Api } from '../../../core/services/api.service';

@Component({
  imports: [DatePipe],
  selector: 'app-post',
  styleUrl: './post.component.css',
  templateUrl: './post.component.html',
})
export class PostComponent {
  private api = inject(Api);

  // postDeleted = output<number>();
  // postRestored = output<number>();
  // postForceDeleted = output<number>();

  @Input({ required: true }) post!: Post;
  @Input() operations = false;
}
