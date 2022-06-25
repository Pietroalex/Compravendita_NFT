import { Component, OnInit } from '@angular/core';
import {AvatarService} from "../../../services/user_related/profile_image/avatar.service";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {NftPurchaseService} from "../../../services/DBop/nft_purchase/nft-purchase.service";
import {ActivatedRoute} from "@angular/router";
import {NftService} from "../../../services/DBop/nfts/nft.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  soldnfts = [];
  purchasednfts = [];
  profile = null;
  search: string;
  gallerynfts = [];
  onsalenfts = [];
  profilestring: string;

  constructor(
    private authService: AuthService,
    private nftHistory: NftPurchaseService,
    private route: ActivatedRoute,
    private nftService: NftService,
  ) {


  }

   ngOnInit() {
     this.start().then(res => this.continue());


  }
   start() {
    return new Promise<void>((resolve, reject) => {
      const result = JSON.parse(localStorage.getItem('profile'));
      this.profile = result;
      this.search =  this.profile.username + "-" + this.profile.uid;
      resolve();
    });
  }

  async continue() {

    await this.get3soldNFTs();
    await this.get3purchasedNFTs();
    await this.get3publicNFTs();
    await this.get3sellerNFTs();
    this.profilestring = JSON.stringify(this.profile);


  }
  async get3soldNFTs(){
    this.soldnfts = await this.nftHistory.get3lastSoldNFTs("seller", this.search)
  }
  async get3purchasedNFTs(){
    this.purchasednfts = await this.nftHistory.get3lastSoldNFTs("buyer", this.search)
  }
  async get3publicNFTs(){
    this.gallerynfts = await this.nftService.get3publicNFTs()
  }
  async get3sellerNFTs(){
    this.onsalenfts = await this.nftService.get3lastselleronsaleNFTs()
  }

  hide_show(value: string) {
    if(value === "private"){
      document.getElementById('privatesection').setAttribute("style", "display: block; ")
      document.getElementById('publicsection').setAttribute("style", "display: none; ")
    }
    else{
      document.getElementById('publicsection').setAttribute("style", "display: block; ")
      document.getElementById('privatesection').setAttribute("style", "display: none; ")
    }
  }
}
