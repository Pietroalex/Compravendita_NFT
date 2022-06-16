import { Component } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {AvatarService} from "./services/avatar.service";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private avatarService: AvatarService,
  ) {

  }

  async logout(){

    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true});

  }

}
