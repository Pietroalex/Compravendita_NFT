import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NftService} from "../../../../services/DBop/nfts/nft.service";

@Component({
  selector: 'app-public-gallery',
  templateUrl: './public-gallery.page.html',
  styleUrls: ['./public-gallery.page.scss'],
})
export class PublicGalleryPage implements OnInit {

  publicgallerynfts = [];
  profile = null;
  num = 0;
  tempo = [];

  constructor(
    private route: ActivatedRoute,
    private nftService: NftService
  ) { }

  ngOnInit() {
    this.profile = JSON.parse(this.route.snapshot.paramMap.get('profile'));

    this.getpublic();
  }

  async getpublic() {
    let publicGallery = this.profile?.publicGallery;
    console.log(publicGallery);
    for (const nftcode of publicGallery) {
      this.tempo = await this.nftService.getpublicNFTs(nftcode);
      this.publicgallerynfts.push(this.tempo[0]);
      this.tempo = [];
    }

  }
}
