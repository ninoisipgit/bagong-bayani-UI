import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { Events } from 'src/app/shared/models/events.model';
import { EventService } from 'src/app/shared/services/event.service';

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
    private toastrService: NbToastrService
  ) {
    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }

  event: any = {
    title: '',
    content: '',
    category: '',
    userID: null,
    author: null,
  };

  isDragOver = false;
  images: string[] = [];

  events: any = [];

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.eventService.getPosts().subscribe((events) => (this.events = events));
  }

  onSubmit() {
    // Handle the submission logic here
    console.log('Images:', this.images);
    this.event.author = this.user._id;
    this.event.userID = this.user._id;
    this.eventService.createPost(this.event).subscribe((res) => {
      console.log(res);
      // Handle successful post creation (e.g., navigate to post list)
    });
  }

  deletePost(id: number) {
    this.eventService.deletePost(id).subscribe(() => this.loadPosts());
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  handleFiles(files: FileList) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.images.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }
}
