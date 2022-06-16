import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/user_related/login/auth.service";

import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AppComponent } from "../../../app.component";
import { AvatarService } from "../../../services/user_related/profile_image/avatar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  implements OnInit {
  profile = null;

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private app: AppComponent,
    private avatarService: AvatarService
  ) {
    this.authService.getUserProfile().subscribe((data) => { this.profile = data; });
  }


  ngOnInit() {


  }

}

