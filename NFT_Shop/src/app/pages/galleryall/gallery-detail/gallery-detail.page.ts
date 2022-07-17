import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController} from "@ionic/angular";

import {NftService} from "../../../services/DBop/nfts/nft.service";
import {TranslateService} from "@ngx-translate/core";




@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.page.html',
  styleUrls: ['./gallery-detail.page.scss'],
})
export class GalleryDetailPage implements OnInit {

  nftcode: string;
  image: string;
  name: string;
  description: string;
  author: string;
  nameauthor: string;

  params: any;
  overlay: string;

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private nftService: NftService,
    private alertController: AlertController,
    private translateService: TranslateService

  ) { this.overlay = "hide"; }

  ngOnInit() {
                                                              //estrae le informazione sul dettaglio dell'item su cui si è navigato
    this.route.paramMap.subscribe(params => {
         this.nftcode = params.get('nftcode');
         this.image = params.get('image');
         this.name = params.get('name');
         this.description = params.get('description');
         this.author = params.get('author');
         this.nameauthor = this.nftcode.substring(0, this.nftcode.indexOf("-"));
         this.params = params;
    });

}
  async topublic(){
    await this.nftService.copytopublic(this.params);
  }

  async back() {
    await this.router.navigateByUrl('/gallery', { replaceUrl: true });
  }
  async gotoauthor() {
    localStorage.setItem('author', this.author)
    await this.router.navigateByUrl('/publicuser-profile', {replaceUrl: true});
  }


  async deletenft(){
    let a: any = {};
    this.translateService.get('ALERT.GalleryDetail.title1').subscribe(t => { a.title = t; })
    this.translateService.get('ALERT.GalleryDetail.message1').subscribe(t =>{ a.message = t; })
    this.translateService.get('ALERT.GalleryDetail.confirm1').subscribe(t =>{ a.confirm = t; })
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
            console.log('Cancel clicked');
          }
        },
        {
          text: a.confirm,
          cssClass: 'confirm',
          handler: () => {

            this.presentConfirm();
          }
        }
      ]
    });
    alert.present();
  }
  async presentConfirm() {
    let a: any = {};
    this.translateService.get('ALERT.GalleryDetail.title2').subscribe(t => { a.title = t; })
    this.translateService.get('ALERT.GalleryDetail.message2').subscribe(t =>{ a.message = t; })
    this.translateService.get('ALERT.GalleryDetail.confirm2').subscribe(t =>{ a.confirm = t; })
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

            await this.nftService.deleteNft(this.nftcode);
            await this.router.navigateByUrl('/gallery', { replaceUrl: true });


          }
        }
      ]
    });
    alert.present();
  }

  async show(){
    this.overlay = "show";
  }
  async hide(){
    this.overlay = "hide";
  }
}
