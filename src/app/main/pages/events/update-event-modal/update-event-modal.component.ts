import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { EventService } from 'src/app/shared/services/event.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-event-modal',
  templateUrl: './update-event-modal.component.html',
  styleUrls: ['./update-event-modal.component.scss'],
})
export class UpdateEventModalComponent {
  @Input() title!: string;
  @Input() postId!: number;

  user!: UserToken;
  isAuthenticated = false;
  eventForm!: FormGroup;
  eventData: any;
  isDragOver = false;

  private userSub: Subscription = new Subscription();

  constructor(
    protected dialogRef: NbDialogRef<UpdateEventModalComponent>,
    private eventService: EventService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.fetchUser();
    this.fetchData();
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

  fetchData() {
    this.eventService.getPostByPostId(this.postId).subscribe((event) => {
      this.eventForm.patchValue(event);
      this.eventData = event;
      const imageControls = event.images.map((img: { id: any; path: any }) => {
        return this.fb.group({
          id: [img.id],
          url: [img.path],
          file: [null], // To store the file object
        });
      });
      this.imagesFormArray.clear();
      imageControls.forEach((control: any) =>
        this.imagesFormArray.push(control)
      );
    });
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

    const imagesToUpload = this.imagesFormArray.controls.filter(
      (ctrl) => !ctrl.value.id
    );

    const formData = new FormData();
    formData.append('userID', this.user._id.toString());
    formData.append('postID', this.postId.toString());

    imagesToUpload.forEach((ctrl) => {
      const file = ctrl.value.file as File;
      if (file) {
        formData.append('images[]', file, file.name);
      }
    });

    if (imagesToUpload.length) {
      this.uploadImages(formData);
    } else {
      this.updatePost();
    }
  }

  uploadImages(formData: FormData) {
    this.eventService.insertImage(formData).subscribe(() => {
      this.updatePost();
    });
  }

  updatePost() {
    const updatedEvent = {
      id: this.postId,
      author: this.eventData.author,
      is_published: false,
      userID: this.eventData.userID,
      ...this.eventForm.value,
      images: this.imagesFormArray.controls.map((ctrl) => ctrl.value.url),
    };

    this.eventService.updatePost(updatedEvent).subscribe();
  }

  get formData() {
    return JSON.stringify(this.eventForm.value, null, 2);
  }

  get isFormValid() {
    return this.eventForm.valid;
  }
}
