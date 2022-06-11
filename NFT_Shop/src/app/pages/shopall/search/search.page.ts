import { Component, OnInit } from '@angular/core';
import {ValueAccessor} from "@ionic/angular/directives/control-value-accessors/value-accessor";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  dest: string;
  value: string;
  isPopoverOpen: any;



  constructor() { }

  ngOnInit() {

  }

  selecttype(value: string) {

    switch (value) {
      case "profile":
        this.dest= "/publicuser-profile";
        break;
      case "salenft":
        this.dest= "/shop-detail";
        break;
      case "publicnft":
        this.dest= "/publicuseritem-detail";
        break;
      case "sellershop":
        this.dest= "/shop";
        break;

    }

  }
}
