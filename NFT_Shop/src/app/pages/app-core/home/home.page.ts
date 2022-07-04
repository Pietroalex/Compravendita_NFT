import {AfterContentChecked, AfterContentInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/user_related/login/auth.service";
import { AlertController } from "@ionic/angular";
import {NftService} from "../../../services/DBop/nfts/nft.service";
import {LanguageService} from "../../../services/user_related/language/language.service";
import {NotifyService} from "../../../services/DBop/notification/notify.service";

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
    private languageService: LanguageService,
    private notifyService: NotifyService
  ) {

  }


  ngOnInit() {
    this.start().then(() => this.continue());
  }

   start() {
     return new Promise<void>((resolve, reject) => {
       this.authService.getUserProfile().subscribe(async (data) => {
         this.profile = data;
         this.nfts = await this.nftService.get6lastonsaleNFTs();
         localStorage.setItem('profile', JSON.stringify(this.profile));
         localStorage.setItem('seller', "null");

       });
       resolve();
     });
  }

   continue() {

     const profile = JSON.parse(localStorage.getItem('profile'));
     this.languageService.setLanguage(profile?.language);


  }






}


