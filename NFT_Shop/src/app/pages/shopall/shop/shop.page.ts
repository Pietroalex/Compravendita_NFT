import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {collectionData, doc, docData, Firestore, getDoc} from "@angular/fire/firestore";
import {NftService} from "../../../services/DBop/nfts/nft.service";


@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  nfts = [];
  userprofile = null;
  seller: string;

   constructor(
    private router: Router,
    private firestore: Firestore,
    private nftService: NftService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {

     this.authService.getUserProfile().subscribe(async (data) => {
       this.userprofile = data;
       this.seller = this.route.snapshot.paramMap.get('seller');
       if(this.seller == "null"){
         this.nfts = await this.nftService.loadAllSellerOnSaleNFTs(this.seller);
       }else {
         this.nfts = await this.nftService.loadAllOnSaleNFTs();
       }
     });

  }



  ngOnInit() {

  }

}
