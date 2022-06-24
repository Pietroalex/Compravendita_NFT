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

  author: string;
  profile = null;
  gallerynfts = [];
  onsalenfts = [];
  profilestring: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private infoService: InformationService,
    private nftService: NftService,
  ) {

  }

  async ngOnInit() {
    this.author = this.route.snapshot.paramMap.get('author');
    console.log(this.author)
    await this.infoService.getUserProfile(this.author).subscribe((data) => {
      this.profile = data;
      this.profilestring = JSON.stringify(this.profile);
    });
    this.get3publicNFTs();
    this.get3sellerNFTs();
  }
  async get3publicNFTs(){
    this.gallerynfts = await this.nftService.get3publicNFTs()
  }
  async get3sellerNFTs(){
    this.onsalenfts = await this.nftService.get3lastselleronsaleNFTs()
  }
}
