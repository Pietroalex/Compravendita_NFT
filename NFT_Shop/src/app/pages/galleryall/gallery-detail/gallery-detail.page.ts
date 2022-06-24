import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ModalController} from "@ionic/angular";



@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.page.html',
  styleUrls: ['./gallery-detail.page.scss'],
})
export class GalleryDetailPage implements OnInit {

  nftcode: string;
  image: string;
  name: string;
  description: string;
  author: string;
  nameauthor: string;
  profilestring: string;


  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private crl: ModalController

  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      console.log(params);
         this.nftcode = params.get('nftcode');
         this.image = params.get('image');
         this.name = params.get('name');
         this.description = params.get('description');
         this.author = params.get('author');
         this.nameauthor = this.nftcode.substring(0, this.nftcode.indexOf("-"));

    });

}

}
