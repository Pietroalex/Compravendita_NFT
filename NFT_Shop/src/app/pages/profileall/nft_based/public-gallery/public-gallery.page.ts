import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-public-gallery',
  templateUrl: './public-gallery.page.html',
  styleUrls: ['./public-gallery.page.scss'],
})
export class PublicGalleryPage implements OnInit {

  nfts = [];
  profile = null;
  num = 0;
  tempo = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.profile = JSON.parse(this.route.snapshot.paramMap.get('profile'));
    console.log(this.profile);
  }

}
