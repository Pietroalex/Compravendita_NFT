import { Component } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Profile', url: '/profile', icon: 'person' },
    { title: 'Gallery', url: '/gallery', icon: 'images' },
    { title: 'Notifications', url: '/notification', icon: 'notifications' },

  ];

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

async logout(){

  await this.authService.logout();
  this.router.navigateByUrl('/', { replaceUrl: true});
}
}
