import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bagong-bayani-UI';

  constructor(private sidebarService: NbSidebarService, private authService : AuthService) {
    this.authService.autoLogin();
  }


  ngOnInit() {
    this.toggle();
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }
}
