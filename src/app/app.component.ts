import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bagong-bayani-UI';

  constructor(private sidebarService: NbSidebarService) {
  }


  ngOnInit() {
    this.toggle();
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }
}
