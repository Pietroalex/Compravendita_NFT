import { Component, OnInit } from '@angular/core';
import {AvatarService} from "../../../services/user_related/profile_image/avatar.service";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {NftPurchaseService} from "../../../services/DBop/nft_purchase/nft-purchase.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NftService} from "../../../services/DBop/nfts/nft.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  tempo = [];

  profile = null;
  search: string;

  publicgallerynfts = [];
  onsalenfts = [];

  soldnfts = [];
  purchasednfts = [];

  profilestring: string;

  constructor(
    private authService: AuthService,
    private nftHistory: NftPurchaseService,
    private route: ActivatedRoute,
    private nftService: NftService,
    private router: Router
  ) {

    this.authService.getUserProfile().subscribe((data) => {
      this.publicgallerynfts = [];
      this.onsalenfts = [];
      this.soldnfts = [];
      this.purchasednfts = [];
      this.profile = data;
      localStorage.setItem('profile', JSON.stringify(this.profile));
      this.start().then(res => this.continue());
      this.profilestring = JSON.stringify(this.profile);
    });
  }

   ngOnInit() {

  }
   start() {
    return new Promise<void>((resolve, reject) => {
      this.search =  this.profile.username + "-" + this.profile.uid;
      resolve();
    });
  }

  async continue() {

    await this.get3soldNFTs();
    await this.get3purchasedNFTs();
    await this.get3public();
    await this.get3sellerNFTs();



  }
  async get3soldNFTs(){
    this.soldnfts = await this.nftHistory.get3lastSoldNFTs("seller", this.search)
  }
  async get3purchasedNFTs(){
    this.purchasednfts = await this.nftHistory.get3lastSoldNFTs("buyer", this.search)
  }

  async get3public() {
    let publicGallery = this.profile?.publicGallery
    console.log(publicGallery)
    let publicGallery3 = publicGallery.slice(0, 3);
    console.log(publicGallery3)
    for (const nftcode of publicGallery3) {
      this.tempo = await this.nftService.getpublicNFTs(nftcode);
      this.publicgallerynfts.push(this.tempo[0]);
      this.tempo = [];
    }
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

  async goeditprofile() {
    await this.router.navigateByUrl('/edit-profile', { replaceUrl: true });
  }
  async gotoshop() {
    localStorage.setItem('seller', this.profile.username + "-" + this.profile.uid)
    await this.router.navigateByUrl('/shop', {replaceUrl: true});
  }
}
