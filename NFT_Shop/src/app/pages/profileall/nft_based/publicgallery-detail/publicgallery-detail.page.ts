import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {NftService} from "../../../../services/DBop/nfts/nft.service";

@Component({
  selector: 'app-public-gallery-detail',
  templateUrl: './publicgallery-detail.page.html',
  styleUrls: ['./publicgallery-detail.page.scss'],
})
export class PublicgalleryDetailPage implements OnInit {

  nftcode: string;
  image: string;
  name: string;
  description: string;
  author: string;
  nameauthor: string;

  overlay: string;

  deleteitem: string;

  check1 : string;
  check2 : string;
  publicuser = null;

  back: string;
  backprofile: string;
  dest: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private nftService: NftService

  ) {
    this.deleteitem = 'need';
    this.overlay = "hide";
    this.backprofile = 'need';
    this.back = 'need';
  }

  ngOnInit() {
    this.check1 = localStorage.getItem('state');
    this.check2 = localStorage.getItem('public');


    if(this.check1 == 'detail' )
    {
      this.dest = 'profile';
      this.back = 'no-need';
    }
    else
    {
      this.dest = 'public-gallery';
      this.backprofile = 'no-need';
    }


    if(this.check2 == 'current' && this.check1 == 'gallery' || this.check1 == 'detail')
    {
      this.deleteitem = 'need';
    }
    else
    {
      this.deleteitem = 'no-need';
    }

    this.route.paramMap.subscribe(params => {

      this.nftcode = params.get('nftcode');
      this.image = params.get('image');
      this.name = params.get('name');
      this.description = params.get('description');
      this.author = params.get('author');
      this.nameauthor = this.nftcode.substring(0, this.nftcode.indexOf("-"));

    });
  }

  async gotoauthor() {
    localStorage.setItem('author', this.author)
    await this.router.navigateByUrl('/publicuser-profile', {replaceUrl: true});
  }

  async show(){
    this.overlay = "show";
  }
  async hide(){
    this.overlay = "hide";
  }

  async toUNpublic() {
    let alert = await this.alertController.create({
      header: 'Remove Item?',
      message: 'Do you want to remove this item from your public NFT gallery?',
      cssClass: 'buttonCss',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Delete Public Item',
          cssClass: 'confirm',
          handler: async () => {
            await this.nftService.deletepublic(this.nftcode);
            await this.router.navigateByUrl( '/'+ this.dest, { replaceUrl: true })
          }
        }
      ]
    });
    await alert.present();
  }
}
