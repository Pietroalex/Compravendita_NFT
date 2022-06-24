import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/user_related/login/auth.service";
import {Firestore} from "@angular/fire/firestore";
import {InformationService} from "../../../../services/user_related/check_user/information.service";
import {AlertController} from "@ionic/angular";
import {NftPurchaseService} from "../../../../services/DBop/nft_purchase/nft-purchase.service";

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.page.html',
  styleUrls: ['./purchase-detail.page.scss'],
})
export class PurchaseDetailPage implements OnInit {
  nftcode: string;
  image: string;
  name: string;
  description: string;
  author: string;
  nameauthor: string;
  seller: string;
  buyer: string;
  purchase_date: Date;
  price: number;

  profile = null;
  nameseller: string;
  uidseller: string;
  namebuyer: string;
  uidbuyer: string;

  money: number;
  Sellerprofile = null;
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private firestore: Firestore,
    private infoService: InformationService,

  ) { }

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
      this.buyer = params.get('buyer');
      this.namebuyer = this.buyer.substring(0, this.buyer.indexOf("-"));
      this.uidbuyer = this.buyer.substring(this.seller.indexOf("-")+1);
      this.purchase_date = new Date(params.get('opurchase_date'));
      this.price = Number(params.get('price'));
      this.infoService.getUserProfile(this.uidseller).subscribe((data) => { this.Sellerprofile = data;});

    });

  }

}
