import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private sidebarService: NbSidebarService) {}

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }
}
