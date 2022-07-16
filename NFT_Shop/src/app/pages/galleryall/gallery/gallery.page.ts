import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Firestore} from "@angular/fire/firestore";

import {NftService} from "../../../services/DBop/nfts/nft.service";
import {ActivatedRoute, Router} from "@angular/router";

import {AlertController} from "@ionic/angular";

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
      private alertController: AlertController

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

  async addallpublic() {                             //Aggiunge tutti gli item dell'utente alla galleria pubblica
    let alert = await this.alertController.create({
      header: 'Share All NFTs',
      message: 'Do you want to share all of your NFTs?',
      cssClass: 'buttonCss',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          cssClass: 'confirm',
          handler: async () => {

            for (let i = 0; i < this.nfts.length; i++) {
              await this.nftService.copyAlltopublic(this.nfts[i]);

            }


            this.presentConfirm();
          }
        }
      ]
    });
    alert.present();
  }

    async presentConfirm(){
      const alert = await this.alertController.create({
        header: 'Successfully published',
        message: 'All users can now admire your pieces of art!',
        buttons: ['OK'],
      });
      await alert.present();

      await this.router.navigateByUrl('/profile', {replaceUrl: true});
      await this.router.navigateByUrl('/public-gallery', {replaceUrl: true});

  }
}



