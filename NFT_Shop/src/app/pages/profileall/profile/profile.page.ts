import {Component, OnInit} from '@angular/core';
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

  purchasedummy: string;
  solddummy: string;
  shopdummy: string;
  gallerydummy: string;

  private: string;
  public: string;

  purchased: string;
  sold: string;
  gallery: string;
  shop: string;
  overlay: string;



  constructor(
    private authService: AuthService,
    private nftHistory: NftPurchaseService,
    private route: ActivatedRoute,
    private nftService: NftService,
    private router: Router
  ) {
    this.purchasedummy = 'need';
    this.solddummy = 'need';
    this.shopdummy = 'need';
    this.gallerydummy = 'need';

    this.private = 'default';
    this.public = 'hidden';
    this.overlay = "hide";
    this.purchased = 'need';
    this.sold = 'need';
    this.gallery = 'need';
    this.shop = 'need';
    localStorage.setItem('state', 'profile')

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
     console.log(this.router.url)
  }
   start() {
    return new Promise<void>((resolve, reject) => {
      this.search =  this.profile.username + "-" + this.profile.uid;
      resolve();
    });
  }

  async continue() {

     this.get3soldNFTs()
     this.get3purchasedNFTs()
     this.get3public()
     this.get3sellerNFTs()



  }
  async get3soldNFTs() {
    this.soldnfts = await this.nftHistory.get3lastSoldNFTs("seller", this.search)
    if (this.soldnfts.length > 0) {
      this.solddummy = 'no-need';
    }else{
      this.sold = 'no-need';
    }
  }
  async get3purchasedNFTs(){
    this.purchasednfts = await this.nftHistory.get3lastSoldNFTs("buyer", this.search)
    if(this.purchasednfts.length > 0){
      this.purchasedummy = 'no-need';
    }else{
      this.purchased = 'no-need';
    }
  }

  async get3public() {
    let publicGallery = this.profile?.publicGallery

    let publicGallery3 = publicGallery.slice(0, 3);

    for (const nftcode of publicGallery3) {
      this.tempo = await this.nftService.getpublicNFTs(nftcode);
      this.publicgallerynfts.push(this.tempo[0]);
      this.tempo = [];
    }
    if(this.publicgallerynfts.length > 0){
      this.gallerydummy = 'no-need';
    }else{
      this.gallery = 'no-need';
    }
  }

  async get3sellerNFTs(){
    this.onsalenfts = await this.nftService.get3lastselleronsaleNFTs(this.profile.username + "-" + this.profile.uid)
    if(this.onsalenfts.length > 0){
      this.shopdummy = 'no-need';
    }else{
      this.shop = 'no-need';
    }
  }

  hide_show(value: string) {
    if(value === "private"){
      this.private = 'default';
      this.public = 'hidden';
    }
    else{
      this.private = 'hidden';
      this.public = 'default';
    }
  }

  async goeditprofile() {
    await this.router.navigateByUrl('/edit-profile', { replaceUrl: true });
  }
  async gotoshop() {
    localStorage.setItem('seller', this.profile.username + "-" + this.profile.uid)
    await this.router.navigateByUrl('/shop');
  }
  async gotodetailsold(num: number) {
    await localStorage.setItem('purchased', JSON.stringify(this.soldnfts[num]) );
    this.router.navigateByUrl('/purchase-detail');
  }
  async gotodetailpurchased(num: number) {
    await localStorage.setItem('purchased', JSON.stringify(this.purchasednfts[num]) );
    this.router.navigateByUrl('/purchase-detail' );
  }
  async show(){
    this.overlay = "show";
  }
  async hide(){
    this.overlay = "hide";
  }

  commProfileState() {
    localStorage.setItem('state', 'detail')
  }
}
