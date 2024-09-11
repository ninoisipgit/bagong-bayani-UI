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

  posts: any = [];
  placeholders: any = [];
  pageSize = 2;
  page = 1;
  loading = false;

  loadNext() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.eventService.getPosts(this.page, this.pageSize).subscribe((posts) => {
      console.log(posts);
      this.placeholders = [];
      this.posts.push(...posts.data);
      this.loading = false;
      this.page++;
    });
  }

  onAdd() {
    this.dialogService.open(AddEventModalComponent, {
      context: {
        title: 'Add Post',
      },
    });
  }
}
