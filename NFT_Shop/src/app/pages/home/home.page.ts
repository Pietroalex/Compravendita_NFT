import { Component, OnInit } from '@angular/core';


import {AuthService} from "../../services/auth.service";

import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  implements OnInit {


  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {

  }


  ngOnInit() {


  }

}

