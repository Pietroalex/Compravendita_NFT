import {AfterContentInit, AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/user_related/login/auth.service";
import {getDoc, Firestore, doc, docData} from "@angular/fire/firestore";
import {Observable, Subscription} from "rxjs";
import {NFT, NftService} from "../../../services/DBop/nfts/nft.service";
import {ActivatedRoute, Router} from "@angular/router";
import {toArray} from "rxjs/operators";
import {AlertController, Gesture, GestureController} from "@ionic/angular";



selector: '[longPress]'
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
    ) {
      this.gallery = 'need';
      this.gallerydummy = 'need';
      const result = JSON.parse(localStorage.getItem('profile'));
      this.profile = result;
    }

    async ngOnInit() {

      this.loadAllNFTs()

    }



    async deleteallpublic() {
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
        alert.present();
      }

    async loadAllNFTs() {
      let privateGallery = this.profile?.privateGallery;
      for (const nftcode of privateGallery) {
        this.tempo = await this.nftService.loadAllGalleryNFTs(nftcode);
        this.nfts.push(this.tempo[0]);
        this.tempo = [];
      }
      if (this.nfts.length > 0) {
        this.gallerydummy = 'no-need';
      } else {
        this.gallery = 'no-need';
      }
    }
      ngOnDestroy() {
        this.nfts = [];
        this.profile = null;
      }

    async create() {
      await this.router.navigateByUrl('/new-item', { replaceUrl: true });
    }

  }



