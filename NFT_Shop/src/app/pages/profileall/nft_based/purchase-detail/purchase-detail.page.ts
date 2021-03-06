import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/user_related/login/auth.service";
import {Firestore, serverTimestamp} from "@angular/fire/firestore";
import {InformationService} from "../../../../services/user_related/check_user/information.service";
import {AlertController} from "@ionic/angular";
import {NftPurchaseService} from "../../../../services/DBop/nft_purchase/nft-purchase.service";
import {timestamp} from "rxjs/operators";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import {NotifyService} from "../../../../services/DBop/notification/notify.service";

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.page.html',
  styleUrls: ['./purchase-detail.page.scss'],
})
export class PurchaseDetailPage implements OnInit, OnDestroy {
  nftcode: string;
  image: string;
  name: string;
  description: string;
  author: string;
  nameauthor: string;
  seller: string;
  buyer: string;
  purchase_date: any;
  price: number;

  profile = null;
  nameseller: string;
  uidseller: string;
  namebuyer: string;
  uidbuyer: string;

  sellerdiv: string;
  buyerdiv: string;

  sell: string;
  purchase: string;

  Sellerprofile = null;

  overlay: string;

  nft: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private firestore: Firestore,
    private infoService: InformationService,
    private notifyService: NotifyService
  ) {
    this.sellerdiv = "need";
    this.buyerdiv = "need";
    this.sell = "need";
    this.purchase = "need";
    this.overlay = "no-need";
    this.profile =  JSON.parse(localStorage.getItem('profile'));
    console.log(this.profile)
  }

  ngOnInit() {





    this.start().then(res => this.continue());
  }
  async start() {
    return new Promise<void>(async (resolve, reject) => {
      this.nft = await JSON.parse(localStorage.getItem('purchased'));
      resolve();
    });
  }

  async continue() {
    let seconds
    let nanoseconds
    console.log(this.nft)
    if(!(this.nft.check === undefined)){
      this.nft = await this.notifyService.load1SoldNFTs(this.nft.nft)
      console.log("funziona ",this.nft)
    }

    this.nftcode = this.nft.nftcode;
    this.image = this.nft.image
    this.name = this.nft.name;
    this.description = this.nft.description;
    this.author = this.nft.author;
    this.nameauthor = this.nftcode.substring(0, this.nftcode.indexOf("-"));
    this.seller = this.nft.seller;
    this.nameseller = this.seller.substring(0, this.seller.indexOf("-"));
    this.uidseller = this.seller.substring(this.seller.indexOf("-")+1);
    this.buyer = this.nft.buyer;
    this.namebuyer = this.buyer.substring(0, this.buyer.indexOf("-"));
    this.uidbuyer = this.buyer.substring(this.buyer.indexOf("-")+1);
    this.price = Number(this.nft.price);
    seconds = (this.nft.purchase_date.seconds)* 1000;
    nanoseconds = (this.nft.purchase_date.nanoseconds)/ 1000000;


    this.purchase_date = seconds + nanoseconds;
    this.infoService.getUserProfile(this.uidseller).subscribe((data) => { this.Sellerprofile = data;});

    if (this.nameseller == this.profile.username) {
      this.sellerdiv = 'no-need';
      this.sell = 'no-need';
    } else {
      this.buyerdiv = 'no-need';
      this.purchase = 'no-need';
    }
  }
  async gotoauthor() {
    localStorage.setItem('author', this.author)
    await this.router.navigateByUrl('/publicuser-profile', {replaceUrl: true});
  }
  async gotoseller(){
    localStorage.setItem('author', this.uidseller)
    await this.router.navigateByUrl('/publicuser-profile', {replaceUrl: true});
  }

  async gotobuyer() {
    localStorage.setItem('author', this.uidbuyer)
    await this.router.navigateByUrl('/publicuser-profile', {replaceUrl: true});
  }
  ngOnDestroy() {
  }

  async show(){
    this.overlay = "need";
  }
  async hide(){
    this.overlay = "no-need";
  }
}
