import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";



let nfts: { nftcode: string, name: string, price: number, img: string }[] = new Array(5);



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {



  }

  getLast6Items(){
    /*
    for(let i=0; i<6; i++){
      nfts[i].nftcode = "pietroalex100";
      nfts[i].name = "pianeta";
      nfts[i].price = 100;
      nfts[i].img = "icon.png";


    }

*/

  }


  navigateFromCode(valuee: number) {


   // alert(valuee+nftss[0].nftcode);

   // this.router.navigate(['/shop-detail'+ JSON.stringify(nftss[0].nftcode)]);
  }

/*
  navigateWithState(value: number) {

    const navigationExtras: NavigationExtras = {
      state: {
        nft_item: {
          nftcode: 'pietroalex10',
          name: 'paesaggio',
          description: null,
          author: 'pietroalex',
          onsaledate: 100212,
          seller: 'pietroalex',
          price: 100,
        },
      },
    }


    this.router.navigateByUrl('/shop-detail', navigationExtras);


  }

 */
  navigateWithState(number: number) {

  }



}

