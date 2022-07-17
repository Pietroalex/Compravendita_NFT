import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Firestore} from "@angular/fire/firestore";

import {NftService} from "../../../services/DBop/nfts/nft.service";
import {ActivatedRoute, Router} from "@angular/router";

import {AlertController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})


 export class GalleryPage implements OnInit, OnDestroy {

    nfts = [];
    profile = null;
    result = null;
    num = 0;
    tempo = [];

     selected = [];

  gallery: string;
  gallerydummy: string;

    constructor(
      private db: Firestore,
      private authService: AuthService,
      private nftService: NftService,
      private route: ActivatedRoute,
      private router: Router,
      private alertController: AlertController,
      private translateService: TranslateService

    ) {                                                   //inizializza i dummy e prende le informazioni sul profilo utente che si è loggato
      this.gallerydummy = 'no-need';
      this.gallery = 'need';
      this.profile = JSON.parse(localStorage.getItem('profile'));
    }

    async ngOnInit() {
                                                        //carica tutti gli item nella galleria
      await this.loadAllNFTs()

    }

    async loadAllNFTs() {                                           //carica tutti gli item posseduti dall'utente e li mostra
      let privateGallery = this.profile?.privateGallery;
      for (const nftcode of privateGallery) {
        this.tempo = await this.nftService.loadAllGalleryNFTs(nftcode);
        this.nfts.push(this.tempo[0]);
        this.tempo = [];
      }
      if (this.nfts.length > 0) {
        this.gallerydummy = 'no-need';
        this.gallery = 'need';
      } else {
        this.gallerydummy = 'need';
        this.gallery = 'no-need';
      }
    }
      ngOnDestroy() {
        this.nfts = [];
        this.profile = null;
      }

    async create() {                                        //naviga alla pagina di creazione di un nuovo item
      await this.router.navigateByUrl('/new-item', { replaceUrl: true });
    }

  async addallpublic() {  //Aggiunge tutti gli item dell'utente alla galleria pubblica
    let a: any = {};
    this.translateService.get('ALERT.Gallery.title1').subscribe(t => { a.title = t; })
    this.translateService.get('ALERT.Gallery.message1').subscribe(t =>{ a.message = t; })
    this.translateService.get('ALERT.Gallery.confirm1').subscribe(t =>{ a.confirm = t; })
    let alert = await this.alertController.create({
      header: a.title,
      message: a.message,
      cssClass: 'buttonCss',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: a.confirm,
          cssClass: 'confirm',
          handler: async () => {
            this.start().then((val) => this.continue(val));




          }
        }
      ]
    });
    alert.present();
  }

start() {
  return new Promise<string>(async (resolve, reject) => {
    let count = 0;
    for (let i = 0; i < this.nfts.length; i++) {
      await this.nftService.copyAlltopublic(this.nfts[i]);
      count = count + 1;
    }
    resolve(count.toString());
  });
}

async continue(val) {
  console.log(val)
  this.presentConfirm();

}
    async presentConfirm(){
      let a: any = {};
      this.translateService.get('ALERT.Gallery.title2').subscribe(t => { a.title = t; })
      this.translateService.get('ALERT.Gallery.message2').subscribe(t =>{ a.message = t; })
      const alert = await this.alertController.create({
        header: a.title,
        message: a.message,
        buttons: ['OK'],
      });
      await alert.present();

      await this.router.navigateByUrl('/profile', {replaceUrl: true});
      await this.router.navigateByUrl('/public-gallery', {replaceUrl: true});

  }
}



