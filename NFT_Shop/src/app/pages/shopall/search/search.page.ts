import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../../services/DBop/search/search.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  value: string;
  type: string;

  NFTs = [];
  profiles = [];
  onSaleNFTs = [];

  profilesdummy: string;
  publicdummy: string;
  onsaledummy: string;

  profile: string;
  public: string;
  onsale: string;

  profilediv: string;
  publicdiv: string;
  onsalediv: string;

  constructor(
    private searchService: SearchService,
    private router: Router
  ) {
    this.profile = 'need';
    this.public = 'need';
    this.onsale = 'need';

    this.onsaledummy = 'need';
    this.profilesdummy = 'need';
    this.publicdummy = 'need';

    this.profilediv = 'no-need';
    this.publicdiv = 'no-need';
    this.onsalediv = 'no-need';

  }

  ngOnInit() {
    localStorage.setItem('public', 'not-current')
    switch(this.type = localStorage.getItem('search-field')){
      case "profile":
        this.value = 'Profile';
        break;
      case "salenft":
        this.value = 'OnSaleNFT';
        break;
      case "publicnft":
        this.value = 'PublicNFT';
        break;
    }
    this.hideother(this.type);
  }

  async back() {
    await this.router.navigateByUrl('/shop', { replaceUrl: true });
  }

  selecttype(value: string) {

    switch (value) {
      case "profile":

        this.value= 'Profile';
        this.type = value;
        break;
      case "salenft":

        this.value= 'OnSaleNFT';
        this.type = value;
        break;

      case "publicnft":

        this.value = 'Public NFT';
        this.type = value;
        break;

    }
    this.hideother(value);
    localStorage.setItem('search-field', value)
  }


  async loadsearch(value) {
    switch (this.type) {
      case "profile":
        this.profiles = await this.searchService.searchprofile(value);
        if (this.profiles.length > 0) {
          this.profilesdummy = 'no-need';
        }else{
          this.profile = 'no-need';
        }
        break;

      case "salenft":
        this.onSaleNFTs = await this.searchService.searchonsale(value);
        if (this.onSaleNFTs.length > 0) {
          this.onsaledummy = 'no-need';
        }else{
          this.onsale = 'no-need';
        }
        break;

      case "publicnft":
        this.NFTs = await this.searchService.searchpublic(value);
        if (this.NFTs.length > 0) {
          this.publicdummy = 'no-need';
            localStorage.setItem('state', 'search')
        }else{
          this.public = 'no-need';
        }
        break;

    }
  }

  hideother(value) {
    switch (value) {
      case "profile":
        this.profilediv = 'need';
        this.publicdiv = 'no-need';
        this.onsalediv = 'no-need';
        break;

      case "salenft":
        this.profilediv = 'no-need';
        this.publicdiv = 'no-need';
        this.onsalediv = 'need';
        break;

      case "publicnft":
        this.profilediv = 'no-need';
        this.publicdiv = 'need';
        this.onsalediv = 'no-need';
        break;

    }
  }

  async goprofile(uid) {
    localStorage.setItem('author', uid);
    await this.router.navigateByUrl('/publicuser-profile');
  }
}
