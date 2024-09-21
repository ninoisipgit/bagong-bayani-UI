import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss'],
})
export class InformationCardComponent {
  @Input() event!: any;
  constructor() {}
}
