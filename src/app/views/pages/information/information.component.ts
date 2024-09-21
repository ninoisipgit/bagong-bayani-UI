import { Component } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent {
  constructor(private eventService: EventService) {}

  posts: any = [];
  placeholders: any = [];
  pageSize = 2;
  page = 1;
  loading = false;
  category = 'Events';

  loadNext() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.eventService
      .getPubPosts(this.page, this.pageSize, this.category)
      .subscribe((posts) => {
        this.placeholders = [];
        this.posts.push(...posts.data);
        this.loading = false;
        this.page++;
      });
  }
}
