import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { Events } from 'src/app/shared/models/events.model';
import { EventService } from 'src/app/shared/services/event.service';
import { NbDialogService } from '@nebular/theme';
import { EventModalComponent } from './event-modal/event-modal.component';
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';
import { UpdateEventModalComponent } from './update-event-modal/update-event-modal.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  user!: UserToken;
  private userSub: Subscription;
  isAuthenticated = false;
  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private http: HttpClient
  ) {
    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }

  posts: any[] = [];
  page: number = 1;
  loading: boolean = false;
  noMoreItems: boolean = false; // Track if there are no more items

  ngOnInit(): void {
    this.loadNext();
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  loadNext(): void {
    if (this.loading || this.noMoreItems) return;

    this.loading = true;

    this.eventService.getPosts(this.page).subscribe({
      next: (response) => {
        this.posts = [...this.posts, ...response.data]; // Append new data

        this.loading = false;
        if (this.page <= response.last_page) {
          this.page++;
        }
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
        this.loading = false;
      },
    });
  }

  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      this.loadNext();
    }
  }

  onAdd() {
    this.dialogService.open(AddEventModalComponent, {
      context: {
        title: 'Add Post',
      },
    });
  }
}
