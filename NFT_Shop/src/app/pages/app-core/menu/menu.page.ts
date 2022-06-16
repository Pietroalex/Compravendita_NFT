import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {AuthService} from "../../../services/auth.service";
import {Router, RouterEvent} from "@angular/router";
import {AvatarService} from "../../../services/avatar.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage   {
  profile = null;
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Profile', url: '/profile', icon: 'person' },
    { title: 'Gallery', url: '/gallery', icon: 'images' },
    { title: 'Notifications', url: '/notification', icon: 'notifications' }
  ];
  selectedPath= '';
  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private avatarService: AvatarService,
  ) {
    this.avatarService.getUserProfile().subscribe((data) => { this.profile = data; });
    this.router.events.subscribe((event: RouterEvent) => this.selectedPath = event.url);
  }

  async logout(){

    await this.authService.logout();
    this.router.navigateByUrl('', { replaceUrl: true});

  }

}
