import { Component, OnInit } from '@angular/core';
import {ValueAccessor} from "@ionic/angular/directives/control-value-accessors/value-accessor";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  dest: string;
  valuee: string;
  tipo: string;


  constructor() { }

  ngOnInit() {
    this.dest= "/publicuser-profile";
    this.valuee= 'profile';
    this.tipo= 'profile';
  }

  selecttype(value: string) {

    switch (value) {
      case "profile":
        this.valuee= 'Profile';
        this.dest= "/publicuser-profile";
        this.tipo=value;
        break;
      case "salenft":
        this.valuee= 'On Sale NFT';
        this.dest= "/shop-detail";
        this.tipo=value;
        break;
      case "publicnft":
        this.valuee= 'Public NFT';
        this.dest= "/public-gallery-detail";
        this.tipo=value;
        break;
      case "sellershop":
        this.valuee= 'Sellershop';
        this.dest= "/shop";
        this.tipo=value;
        break;
    }

  }



}
