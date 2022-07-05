import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Firestore} from "@angular/fire/firestore";
import {NftService} from "../../../../services/DBop/nfts/nft.service";
import {NftPurchaseService} from "../../../../services/DBop/nft_purchase/nft-purchase.service";
import {AuthService} from "../../../../services/user_related/login/auth.service";

@Component({
  selector: 'app-nft-purchased',
  templateUrl: './nft-purchased.page.html',
  styleUrls: ['./nft-purchased.page.scss'],
})
export class NftPurchasedPage implements OnInit {

  nfts = [];
  profile = null;
  search: string;

  purchased: string;
  purchasedummy: string;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private nftHistory: NftPurchaseService,
    private route: ActivatedRoute
  ) {
    this.purchased = 'need';
    this.purchasedummy = 'need';

  }

  async ngOnInit() {
    this.profile = JSON.parse(this.route.snapshot.paramMap.get('profile'));
    console.log(this.profile);
    this.search = this.profile.username + "-" + this.profile.uid;
    this.nfts = await this.nftHistory.loadHistory("seller", this.search);
    if(this.nfts.length > 0){
      this.purchasedummy = 'no-need';
    }else{
      this.purchased = 'no-need';
    }
  }

  async gotodetail(num: number) {
    await localStorage.setItem('purchased', JSON.stringify(this.nfts[num]));
    this.router.navigateByUrl('/purchase-detail');
  }
}
