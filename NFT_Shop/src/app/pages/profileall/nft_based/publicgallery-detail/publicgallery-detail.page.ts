import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {NftService} from "../../../../services/DBop/nfts/nft.service";
import {TranslateService} from "@ngx-translate/core";

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
    private nftService: NftService,
    private translateService: TranslateService

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
    let a: any = {};
    this.translateService.get('ALERT.PublicGalleryDetail.title').subscribe(t => { a.title = t; })
    this.translateService.get('ALERT.PublicGalleryDetail.message').subscribe(t =>{ a.message = t; })
    this.translateService.get('ALERT.confirm').subscribe(t => { a.confirm = t; })
    this.translateService.get('ALERT.cancel').subscribe(t =>{ a.cancel = t; })
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
            await this.nftService.deletepublic(this.nftcode);
            await this.router.navigateByUrl( '/'+ this.dest, { replaceUrl: true })
          }
        }
      ]
    });
    await alert.present();
  }
}
