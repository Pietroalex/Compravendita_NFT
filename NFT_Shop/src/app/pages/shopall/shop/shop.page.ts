import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class ShopPage implements OnInit, OnDestroy {
  nfts = [];
  seller: string;
  profile = null;
  check: boolean;
  value: string;
  type: string;

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
    switch (this.type = localStorage.getItem('order-field')) {
      case "newer":
        this.value = 'newer';
        break;
      case "older":
        this.value = 'older';
        break;
      case "cheaper":
        this.value = 'cheaper';
        break;
      case "expensive":
        this.value = 'expensive';
        break;
    }
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

  selectorder(value: string) {

    switch (value) {
      case "newer":
        this.value = 'newer';
        this.type = value;
        break;

      case "older":
        this.value = 'older';
        this.type = value;
        break;

      case "cheaper":
        this.value = 'cheaper';
        this.type = value;
        break;

      case "expensive":
        this.value = 'expensive';
        this.type = value;
        break;

    }

    localStorage.setItem('order-field', value)
    this.continuee()
  }




   startt() {
     return new Promise<void>((resolve, reject) => {
       console.log(this.seller)
       if (this.seller === "null") {
         this.check = true;
       }else { this.check = false }

       resolve();
     });


}

   async continuee() {

     if (this.check) {
     //  this.nfts = await this.nftService.loadAllOnSaleNFTs();
       this.nfts = await this.nftService.loadAllOnSaleNFTsorder();
     } else {
       //this.nfts = await this.nftService.loadAllSellerOnSaleNFTs();
       this.nfts = await this.nftService.loadAllSellerOnSaleNFTsorder();
     }

   }
   ngOnDestroy() {
     localStorage.setItem('seller', "null");
   }
}
