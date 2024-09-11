import { Component, Input } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { UpdateEventModalComponent } from '../update-event-modal/update-event-modal.component';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() event!: any;
  items = [{ title: 'Profile' }, { title: 'Log out' }];
  constructor(
    private dialogService: NbDialogService,
    private eventService: EventService,
    private toastrService: NbToastrService
  ) {}

  onEdit() {
    this.dialogService.open(UpdateEventModalComponent, {
      context: {
        title: 'Update Post',
        postId: this.event.id,
      },
    });
  }

  onDelete() {
    this.eventService.deletePost(this.event.id).subscribe((e: any) => {
      if (e) {
        this.showToast(e.message, 'Delete', 'success');
        window.location.reload();
      }
    });
  }
  onPublish() {
    console.log('onPublish');
  }
  showToast(message: string, title: string, status: string) {
    this.toastrService.show(message, title, { status });
  }
}
