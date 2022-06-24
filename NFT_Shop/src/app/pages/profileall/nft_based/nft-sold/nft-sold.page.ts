import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
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
  constructor(
    private router: Router,
    private firestore: Firestore,
    private authService: AuthService,
    private nftHistory: NftPurchaseService,
  ) {
    this.authService.getUserProfile().subscribe(async (data) => {
      this.profile = data;
      this.search = this.profile.username + "-" + this.profile.uid;
      this.nfts = await this.nftHistory.loadHistory("seller", this.search)
    });
  }

  ngOnInit() {
  }

}
