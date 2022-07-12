import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-public-gallery-detail',
  templateUrl: './publicgallery-detail.page.html',
  styleUrls: ['./publicgallery-detail.page.scss'],
})
export class PublicgalleryDetailPage implements OnInit {

  nftcode: string;
  image: string;
  name: string;
  description: string;
  author: string;
  nameauthor: string;

  overlay: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { this.overlay = "hide";}

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

  async gotoauthor() {
    localStorage.setItem('author', this.author)
    await this.router.navigateByUrl('/publicuser-profile', {replaceUrl: true});
  }

  async show(){
    this.overlay = "show";
  }
  async hide(){
    this.overlay = "hide";
  }
}
