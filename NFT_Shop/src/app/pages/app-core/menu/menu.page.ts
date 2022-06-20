import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Router, RouterEvent} from "@angular/router";
import {AvatarService} from "../../../services/user_related/profile_image/avatar.service";
import { getAuth, signOut } from "firebase/auth";
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

  ) {
    this.authService.getUserProfile().subscribe((data) => { this.profile = data; });
    this.router.events.subscribe((event: RouterEvent) => this.selectedPath = event.url);
  }

  async logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true});
    }).catch((error) => {
      // An error happened.
    });
  }
}
