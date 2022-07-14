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



    async deleteallpublic() {                             //elimina tutti gli item pubblici che l'utente ha pubblicato
      let publicGallery = this.profile?.publicGallery
      console.log(publicGallery)
        let alert = await this.alertController.create({
          header: 'Empty your PublicGallery?',
          message: 'Do you want to empty your public NFT gallery?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {

              }
            },
            {
              text: 'Delete Public Gallery',
              handler: async () => {
                for (const nftcode of publicGallery) {
                  await this.nftService.deletepublic(nftcode);

                }
              }
            }
          ]
        });
        await alert.present();
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

  }



