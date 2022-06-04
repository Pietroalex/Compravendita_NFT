import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Profile', url: '/profile', icon: 'person' },
    { title: 'Gallery', url: '/gallery', icon: 'heart' },
    { title: 'Notifications', url: '/notification', icon: 'notifications' },
    { title: 'Log Out', url: '/logout', icon: 'log-out' },

  ];

  constructor() {}
}
