import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../../services/DBop/search/search.service";
import {arrayUnion, doc, Firestore, setDoc, updateDoc} from "@angular/fire/firestore";


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

  constructor(
    private searchService: SearchService,
    private firestore: Firestore
  ) { }

  ngOnInit() {

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
    console.log(value)
    switch (this.type) {
      case "profile":
        this.profiles = await this.searchService.searchprofile(value);
        break;

      case "salenft":
        this.onSaleNFTs = await this.searchService.searchonsale(value);
        break;

      case "publicnft":
        this.NFTs = await this.searchService.searchpublic(value);
        break;

    }
  }
  hideSearch() {

  }
  hideother(value: string) {
    switch (this.type) {
      case "profile":
        document.getElementById('profile').setAttribute("style", "display: block; ")
        document.getElementById('salenft').setAttribute("style", "display: none; ")
        document.getElementById('publicnft').setAttribute("style", "display: none; ")
        break;

      case "salenft":
        document.getElementById('profile').setAttribute("style", "display: none; ")
        document.getElementById('salenft').setAttribute("style", "display: block; ")
        document.getElementById('publicnft').setAttribute("style", "display: none; ")
        break;

      case "publicnft":
        document.getElementById('profile').setAttribute("style", "display: none; ")
        document.getElementById('salenft').setAttribute("style", "display: none; ")
        document.getElementById('publicnft').setAttribute("style", "display: block; ")
        break;

    }
  }

  goprofile(uid) {
    localStorage.setItem('author', uid);
  }
}
