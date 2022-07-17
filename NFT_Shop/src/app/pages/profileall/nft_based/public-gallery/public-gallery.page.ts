import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NftService} from "../../../../services/DBop/nfts/nft.service";
import {AlertController} from "@ionic/angular";
import {AuthService} from "../../../../services/user_related/login/auth.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-public-gallery',
  templateUrl: './public-gallery.page.html',
  styleUrls: ['./public-gallery.page.scss'],
})
export class PublicGalleryPage implements OnInit {

  publicgallerynfts = [];
  publicuser = null;
  profile = null;
  num = 0;
  tempo = [];

  gallery: string;
  gallerydummy: string;

  deleteall: string;
  back: string;
  backemergency: string;

  check: string;

  constructor(
    private route: ActivatedRoute,
    private nftService: NftService,
    private alertController: AlertController,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.gallerydummy = 'need';
    this.gallery = 'need';
    this.deleteall = 'needs';
    this.back = 'needs';
    this.backemergency = 'needs';

  }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.publicuser = JSON.parse(this.route.snapshot.paramMap.get('profile'));

    if (this.publicuser == null) {
      this.publicuser = this.profile;
    }
    this.check = localStorage.getItem('state');

    if (
      this.publicuser.username == this.profile.username && (this.check == 'profile' || this.check == 'gallery')
    ) {
      localStorage.setItem('public', 'current')

      this.back = 'no-need';

    } else {
      console.log("profilo diverso")
      localStorage.setItem('public', 'not-current')

      this.backemergency = 'no-need';
      this.deleteall = 'no-need'
    }

    localStorage.setItem('publicinfo', JSON.stringify(this.profile))

    if (localStorage.getItem('state') == 'profile') {
      localStorage.setItem('state', 'gallery')
    } else {
      this.deleteall = 'no-need';
      localStorage.setItem('state', 'public')
    }
    this.getpublic();
  }

  async getpublic() {
    let publicGallery = this.publicuser?.publicGallery;

    for (const nftcode of publicGallery) {
      this.tempo = await this.nftService.getpublicNFTs(nftcode);
      this.publicgallerynfts.push(this.tempo[0]);
      this.tempo = [];
    }
    if (this.publicgallerynfts.length > 0) {
      this.gallerydummy = 'no-need';

    } else {
      this.gallery = 'no-need';

    }
  }

  async deleteallpublic() {                             //elimina tutti gli item pubblici che l'utente ha pubblicato
    let a: any = {};
    this.translateService.get('ALERT.PublicGallery.title').subscribe(t => { a.title = t; })
    this.translateService.get('ALERT.PublicGallery.message').subscribe(t =>{ a.message = t; })
    this.translateService.get('ALERT.confirm').subscribe(t => { a.confirm = t; })
    this.translateService.get('ALERT.cancel').subscribe(t =>{ a.cancel = t; })
    let publicGallery = this.profile?.publicGallery
    let alert = await this.alertController.create({
      header: a.title,
      message: a.message,
      cssClass: 'buttonCss',
      buttons: [
        {
          text: a.cancel,
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {

          }
        },
        {
          text: a.confirm,
          cssClass: 'confirm',
          handler: async () => {

            this.start(publicGallery).then((val) => this.continue(val));

          }
        }
      ]
    });
    await alert.present();
  }

  start(publicGallery) {
    return new Promise<string>(async (resolve, reject) => {
  let count = 0;
      for (const nftcode of publicGallery) {
       count = count + await this.nftService.deleteAllpublic(nftcode);
      }
      resolve(count.toString());
    });
  }

  async continue(val) {
    console.log(val)
    await this.router.navigateByUrl('/profile', {replaceUrl: true});
    await this.router.navigateByUrl('/public-gallery', {replaceUrl: true});
  }
}




