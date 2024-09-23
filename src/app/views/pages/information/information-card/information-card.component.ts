import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss'],
})
export class InformationCardComponent {
  @Input() event!: any;
  constructor() {}
  // imageObject = [
  //   {
  //     image: 'https://picsum.photos/200/300',
  //     thumbImage: 'https://picsum.photos/200/300',
  //     alt: 'alt of image',
  //     title: 'title of image',
  //   },
  // ];

  imageObject: any[] = []; // To hold the formatted imageObject
  // Use the ngOnChanges lifecycle hook to respond to @Input changes
  ngOnChanges(): void {
    if (this.event && this.event.images && Array.isArray(this.event.images)) {
      this.imageObject = this.event.images.map(
        (imageData: any, index: number) => ({
          image: imageData.path, // Use the 'path' for the main image
          thumbImage: imageData.path, // Use the same 'path' for the thumbnail or different if available
          alt: `Image ${index + 1}`, // Alt text for accessibility
          title: '', // You can customize the title
        })
      );
    }
  }
}
