import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
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
  constructor(
    private router: Router,
    private firestore: Firestore,
    private nftHistory: NftPurchaseService,
    private authService: AuthService
  ) {
    this.authService.getUserProfile().subscribe(async (data) => {
      this.profile = data;
      this.search = this.profile.username + "-" + this.profile.uid;
      this.nfts = await this.nftHistory.loadHistory("buyer", this.search);
    });
  }

  ngOnInit() {
  }

}
