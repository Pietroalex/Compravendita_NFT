import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.page.html',
  styleUrls: ['./shop-detail.page.scss'],
})
export class ShopDetailPage implements OnInit {
 data:any;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    //const routerState = this.router.getCurrentNavigation().extras.state;
    this.data = this.route.snapshot.paramMap.get('nft')
     alert(this.data.toString());

  }

}
