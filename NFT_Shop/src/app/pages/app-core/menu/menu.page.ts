import { Component, OnInit } from '@angular/core';
import {AlertController, PopoverController} from "@ionic/angular";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Router, RouterEvent} from "@angular/router";
import {AvatarService} from "../../../services/user_related/profile_image/avatar.service";
import { getAuth, signOut } from "firebase/auth";
import {LanguagePopoverPage} from "../language-popover/language-popover.page";
import {LanguageService} from "../../../services/user_related/language/language.service";
import {NotifyService} from "../../../services/DBop/notification/notify.service";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage   {
  profile = null;
  auth: any



  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private popoverController: PopoverController,
    private notifyService: NotifyService


  ) {
    this.auth = getAuth();
    this.authService.getUserProfile().subscribe((data) => {
        this.profile = data;
        localStorage.setItem('profile', JSON.stringify(this.profile));
        localStorage.setItem('search-field', "profile")
        localStorage.setItem('order-field', "newer")

      });

    localStorage.setItem('notif', 'background-color: transparent;')

  }

  async logout() {

    signOut(this.auth).then(() => this.router.navigateByUrl('/home', {replaceUrl: true}))

  }

  async openLangPop($event) {
    const popover = await this.popoverController.create({
      component: LanguagePopoverPage,
      event: $event
    });
    await popover.present();
  }
}
