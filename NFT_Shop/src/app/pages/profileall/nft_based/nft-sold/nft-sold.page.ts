import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Firestore} from "@angular/fire/firestore";
import {NftService} from "../../../../services/DBop/nfts/nft.service";
import {AuthService} from "../../../../services/user_related/login/auth.service";
import {NftPurchaseService} from "../../../../services/DBop/nft_purchase/nft-purchase.service";

@Component({
  selector: 'app-nft-sold',
  templateUrl: './nft-sold.page.html',
  styleUrls: ['./nft-sold.page.scss'],
})
export class NftSoldPage implements OnInit {

  nfts = [];
  profile = null;
  search: string;

  solddummy: string;
  sold: string;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private authService: AuthService,
    private nftHistory: NftPurchaseService,
    private route: ActivatedRoute
  ) {
    this.sold = 'need';
    this.solddummy = 'need';
  }

  async ngOnInit() {
    this.profile = JSON.parse(this.route.snapshot.paramMap.get('profile'));
    console.log(this.profile);
    this.search = this.profile.username + "-" + this.profile.uid;
    this.nfts = await this.nftHistory.loadHistory("seller", this.search);
    if (this.nfts.length > 0) {
      this.solddummy = 'no-need';
    }else{
      this.sold = 'no-need';
    }
  }
  async gotodetail(num: number) {
    await localStorage.setItem('purchased', JSON.stringify(this.nfts[num]));
    this.router.navigateByUrl('/purchase-detail');
  }
}
