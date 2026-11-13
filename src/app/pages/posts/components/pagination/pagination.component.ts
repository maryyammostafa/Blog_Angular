import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  currentPage = input.required<number>();
  lastPage = input.required<number>();

  pageChange = output<number>();
  pages = computed(() => Array.from({ length: this.lastPage() }, (_, i) => i + 1));

  goTo(page: number) {
    if (page < 1 || page > this.lastPage() || page === this.currentPage()) 
      return;
    this.pageChange.emit(page);
  }
}
