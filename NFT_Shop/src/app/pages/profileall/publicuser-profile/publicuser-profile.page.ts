import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InformationService} from "../../../services/user_related/check_user/information.service";
import {NftService} from "../../../services/DBop/nfts/nft.service";

@Component({
  selector: 'app-publicuser-profile',
  templateUrl: './publicuser-profile.page.html',
  styleUrls: ['./publicuser-profile.page.scss'],
})
export class PublicuserProfilePage implements OnInit {

  tempo = [];

  author: string;
  profile = null;
  service: string;
  publicgallerynfts = [];
  onsalenfts = [];
  profilestring: string;

  gallery: string;
  shop: string;

  shopdummy: string;
  gallerydummy: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private infoService: InformationService,
    private nftService: NftService,
  ) {

    this.shopdummy = 'need';
    this.gallerydummy = 'need';

    this.gallery = 'need';
    this.shop = 'need';

  }

  async ngOnInit() {
    this.author = localStorage.getItem('author');

    await this.infoService.getUserProfile(this.author).subscribe((data) => {
      this.profile = data;
      localStorage.setItem('seller', this.profile.username + "-" + this.author)
      this.start().then(res => this.continue());

    });
  }



  private start() {
    return new Promise<void>(async (resolve, reject) => {
      this.profilestring = JSON.stringify(this.profile);
      resolve();
    });
  }

  private async continue() {
    await this.get3public();
    await this.get3sellerNFTs();
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

  async gotoshop() {
    await this.router.navigateByUrl('/shop', {replaceUrl: true});
  }
}
