import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { EventService } from 'src/app/shared/services/event.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss'],
})
export class AddEventModalComponent implements OnInit, OnDestroy {
  @Input() title!: string;
  @Input() postId!: number;

  user!: UserToken;
  isAuthenticated = false;
  eventForm!: FormGroup;
  isDragOver = false;

  private userSub: Subscription = new Subscription();

  constructor(
    protected dialogRef: NbDialogRef<AddEventModalComponent>,
    private eventService: EventService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.fetchUser();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe(); // Clean up subscription
  }

  initForm() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      images: this.fb.array([]), // Initialize FormArray for images
    });
  }

  fetchUser() {
    this.userSub.add(
      this.authService.user.subscribe((user) => {
        this.user = user;
        this.isAuthenticated = !!user;
      })
    );
  }

  get imagesFormArray(): FormArray {
    return this.eventForm.get('images') as FormArray;
  }

  close() {
    this.dialogRef.close();
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
        this.imagesFormArray.push(
          this.fb.group({
            id: [null],
            url: [reader.result as string],
            file: [file], // Store the file object
          })
        );
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    const image = this.imagesFormArray.at(index).value;
    if (image.id) {
      this.eventService.deleteImage(image.id).subscribe(() => {
        this.imagesFormArray.removeAt(index);
      });
    } else {
      this.imagesFormArray.removeAt(index);
    }
  }

  onSubmit() {
    if (this.eventForm.invalid) {
      return;
    }

    // Step 1: Create the post first
    const postPayload = {
      author: this.user._id.toString(),
      is_published: false,
      userID: this.user._id,
      ...this.eventForm.value,
      images: [], // Initially empty, to be updated after creating the post
    };

    this.eventService.createPost(postPayload).subscribe((post) => {
      const postId = post.id; // Assume `post.id` contains the ID of the created post

      if (!postId) {
        return;
      }
      // Step 2: Prepare images for upload
      const imagesToUpload = this.imagesFormArray.controls.filter(
        (ctrl) => !ctrl.value.id
      );

      const formData = new FormData();
      formData.append('userID', this.user._id.toString()); // Convert postId to string
      formData.append('postID', postId.toString()); // Convert postId to string

      imagesToUpload.forEach((ctrl) => {
        const file = ctrl.value.file as File;
        if (file) {
          formData.append('images[]', file, file.name);
        }
      });

      if (imagesToUpload.length) {
        this.uploadImages(formData);
      } else {
        this.close(); // Close dialog if no images to upload
        window.location.reload();
      }
    });
  }

  uploadImages(formData: FormData) {
    this.eventService.insertImage(formData).subscribe(() => {
      this.close(); // Close dialog after uploading images
      window.location.reload();
    });
  }
}
