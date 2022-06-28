import { Component, OnInit } from '@angular/core';
import {AlertController, PopoverController} from "@ionic/angular";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Router, RouterEvent} from "@angular/router";
import {AvatarService} from "../../../services/user_related/profile_image/avatar.service";
import { getAuth, signOut } from "firebase/auth";
import {LanguagePopoverPage} from "../language-popover/language-popover.page";
import {LanguageService} from "../../../services/user_related/language/language.service";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage   {
  profile = null;


  public appPages = [
    { id: 'home', title: 'Home', url: 'home', icon: 'home' },
    { id: 'person', title: 'Profile', url: 'profile', icon: 'person' },
    { id: 'gallery', title: 'Gallery', url: 'gallery', icon: 'images' },
    { id: 'notify', title: 'Notifications', url: 'notification', icon: 'notifications' },

  ];
  selectedPath= '';
  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private popoverConroller: PopoverController,


  ) {
    this.authService.getUserProfile().subscribe((data) => {
        this.profile = data;
        localStorage.setItem('profile', JSON.stringify(this.profile));
        localStorage.setItem('search-field', "profile")
        localStorage.setItem('order-field', "newer")

      });
    this.router.events.subscribe((event: RouterEvent) => this.selectedPath = event.url);
    localStorage.setItem('notif', 'background-color: transparent;')

  }

  async logout() {
    const auth = getAuth();
    signOut(auth).then( () => {
       this.router.navigateByUrl('/', {replaceUrl: true});
    }).catch((error) => {
      // An error happened.
    });
  }

  async openLangPop($event) {
    const popover = await this.popoverConroller.create({
      component: LanguagePopoverPage,
      event: $event
    });
    await popover.present();
  }
}
