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
  seller: string;
  profile = null;
  check:boolean;
   constructor(
    private router: Router,
    private firestore: Firestore,
    private nftService: NftService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
     this.seller = localStorage.getItem('seller');
     this.start().then(res => this.continue());
  }



  async ngOnInit() {
  }

  async gotosearch() {
    await this.router.navigateByUrl('/search', {replaceUrl: true});
  }

   async start() {
    return new Promise<void>((resolve, reject) => {
      const result = JSON.parse(localStorage.getItem('profile'));
      this.profile = result;
      resolve();
    });
  }

   async continue() {
     //this.seller = this.route.snapshot.paramMap.get('seller');

     this.startt().then(res => this.continuee());


   }


   startt() {
     return new Promise<void>((resolve, reject) => {
       console.log(this.seller)
       if (this.seller === "null") {
         this.check = true;
       }else { this.check = false }
       console.log(this.check)
       resolve();
     });


}

   async continuee() {
     console.log(this.seller)
     if (this.check) {
       this.nfts = await this.nftService.loadAllOnSaleNFTs();
     } else {
       this.nfts = await this.nftService.loadAllSellerOnSaleNFTs();
     }

   }
}
