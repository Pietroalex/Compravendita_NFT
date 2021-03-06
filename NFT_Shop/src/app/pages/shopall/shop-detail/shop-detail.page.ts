import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  Firestore,
  serverTimestamp,
  setDoc,
  updateDoc
} from "@angular/fire/firestore";
import {InformationService} from "../../../services/user_related/check_user/information.service";
import {AlertController} from "@ionic/angular";
import {NftPurchaseService} from "../../../services/DBop/nft_purchase/nft-purchase.service";
import {NotifyService} from "../../../services/DBop/notification/notify.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.page.html',
  styleUrls: ['./shop-detail.page.scss'],
})
export class ShopDetailPage implements OnInit {

  nftcode: string;
  image: string;
  name: string;
  description: string;
  author: string;
  nameauthor: string;
  seller: string;
  onsale_date: Date;
  price: number;

  profile = null;
  nameseller: string;
  uidseller: string;

  money: number;
  Sellerprofile = null;
  params: any;

  Buy: string;
  cancel: string;

  overlay: string;
  a: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private firestore: Firestore,
    private infoService: InformationService,
    private alertController: AlertController,
    private nftpurchaseService: NftPurchaseService,
    private notifyService: NotifyService,
    private translateService: TranslateService
  ) {

    this.profile =  JSON.parse(localStorage.getItem('profile'));
    this.Buy = "need";
    this.cancel = "need";
    this.overlay = "no-need";
    this.translateService.get('ALERT.ShopDetail.title1').subscribe(t => { this.a.title1 = t; })
    this.translateService.get('ALERT.ShopDetail.message1').subscribe(t =>{ this.a.message1 = t; })
    this.translateService.get('ALERT.ShopDetail.title2').subscribe(t => { this.a.title2 = t; })
    this.translateService.get('ALERT.ShopDetail.message2').subscribe(t =>{ this.a.message2 = t; })
    this.translateService.get('ALERT.ShopDetail.title3').subscribe(t => { this.a.title3 = t; })
    this.translateService.get('ALERT.ShopDetail.message3').subscribe(t =>{ this.a.message3 = t; })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.nftcode = params.get('nftcode');
      this.image = params.get('image');
      this.name = params.get('name');
      this.description = params.get('description');
      this.author = params.get('author');
      this.nameauthor = this.nftcode.substring(0, this.nftcode.indexOf("-"));
      this.seller = params.get('seller');
      this.nameseller = this.seller.substring(0, this.seller.indexOf("-"));
      this.uidseller = this.seller.substring(this.seller.indexOf("-")+1);

      this.onsale_date = new Date(params.get('onsale_date'));
      this.price = Number(params.get('price'));
      this.infoService.getUserProfile(this.uidseller).subscribe((data) => { this.Sellerprofile = data;});
      this.params = params;
    });

    if(this.nameseller == this.profile.username) {
      this.Buy = 'no-need';
    } else {
      this.cancel = 'no-need';

    }

  }

  async buynft() {
    let Sellermoney = 0;
    this.money = this.profile.cashart;
    if(this.money >= this.price){

      const seller = this.uidseller;
      const user = this.profile?.uid;

      Sellermoney = this.Sellerprofile.cashart;

      if(seller != user){
      Sellermoney = Sellermoney + this.price;
      this.money = this.money - this.price;
      }


      const OnSaleRef = doc(this.firestore, "NFTs", this.nftcode);
      await setDoc(OnSaleRef, {                                  //crea il documento del OnSaleNFT
        nftcode: this.nftcode,
        image: this.image,
        name: this.name,
        description: this.description,
        author: this.author,

      });
      try {

        const docRef = doc(this.firestore, `Users/${user}`);

        await updateDoc(docRef, {
          privateGallery: arrayUnion(this.nftcode),
          cashart: this.money,
        });
        const SeldocRef = doc(this.firestore, `Users/${seller}`);
        await updateDoc(SeldocRef, {
          cashart: Sellermoney,
        });

        this.showAlert(this.a.title1, this.a.message1)

        await deleteDoc(doc(this.firestore, "OnSaleNFTs", this.nftcode));
        await this.nftpurchaseService.createHistory(this.profile, this.Sellerprofile, this.params);
        await this.notifyService.notify(this.profile, this.Sellerprofile, this.params);
        await localStorage.setItem('profile', JSON.stringify(this.profile));
        await this.router.navigateByUrl('/purchase-detail', {replaceUrl: true});

        return true;
      } catch (e) {
        return null;
      }

    } else {
      this.showAlert(this.a.title2, this.a.message2)
    }
  }

  async cancelnft() {

    const user = this.profile?.uid;
    const OnSaleRef = doc(this.firestore, "NFTs", this.nftcode);

    await setDoc(OnSaleRef, {                                  //crea il documento del OnSaleNFT
      nftcode: this.nftcode,
      image: this.image,
      name: this.name,
      description: this.description,
      author: this.author,
    });

    try {
      const docRef = doc(this.firestore, `Users/${user}`);

      await updateDoc(docRef, {
        privateGallery: arrayUnion(this.nftcode)
      });

      this.showAlert(this.a.title3, this.a.message3)

      await deleteDoc(doc(this.firestore, "OnSaleNFTs", this.nftcode));
      await this.router.navigateByUrl('/gallery', {replaceUrl: true});
      return true;
    }catch (e) {
      return null;
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

 async gotoauthor() {
   localStorage.setItem('author', this.author)
    await this.router.navigateByUrl('/publicuser-profile', {replaceUrl: true});
  }
  async gotoseller(){
    localStorage.setItem('author', this.uidseller)
    await this.router.navigateByUrl('/publicuser-profile', {replaceUrl: true});
  }

  async show(){
    this.overlay = "need";
  }
  async hide(){
    this.overlay = "no-need";
  }
}
