import { Component, OnInit } from '@angular/core';


import {AuthService} from "../../../services/auth.service";

import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import { AppComponent } from "../../../app.component";
import firebase from "firebase/compat";
import {AvatarService} from "../../../services/avatar.service";

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
    this.avatarService.getUserProfile().subscribe((data) => { this.profile = data; });
  }


  ngOnInit() {


  }

}

