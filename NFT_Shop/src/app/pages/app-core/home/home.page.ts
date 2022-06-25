import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/user_related/login/auth.service";
import { AlertController } from "@ionic/angular";
import {NftService} from "../../../services/DBop/nfts/nft.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  implements OnInit {

  profile = null;
  nfts = [];

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private nftService: NftService,
  ) {
    this.authService.getUserProfile().subscribe(async (data) => {
      this.profile = data;
      this.nfts = await this.nftService.get6lastonsaleNFTs();
      localStorage.setItem('profile', JSON.stringify(this.profile));
      localStorage.setItem('seller', "null");
    });

  }


  ngOnInit() {


  }


}

