import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";


//let nfts: { nftcode: string, name: string, price: number, img: string }[] = new Array(5);


interface nfts {
  nftcode: string;
  name: string;
  price: number;
  img: string;
}
let arr3: nfts[] = [];
let nftcodee;
let namee;
let pricee;
let imgg;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  implements OnInit, nfts {

  constructor(private router: Router) {
  }

  ngOnInit() {
/*

    arr3.push({ nftcode: "pietroalex100", name: "pianeta", price: 100, img: "icon.png" });
    arr3.push({ nftcode: "pietroalex100", name: "pianeta", price: 100, img: "icon.png" });
    arr3.push({ nftcode: "pietroalex100", name: "pianeta", price: 100, img: "icon.png" });
    arr3.push({ nftcode: "pietroalex100", name: "pianeta", price: 100, img: "icon.png" });
    arr3.push({ nftcode: "pietroalex100", name: "pianeta", price: 100, img: "icon.png" });
    console.log(arr3.push({ nftcode: "pietroalex100", name: "pianeta", price: 100, img: "icon.png" }));
    alert(arr3.push({ nftcode: "pietroalex100", name: "pianeta", price: 100, img: "icon.png" }))
    console.log(arr3[0].nftcode)

 */
  }
  getLast6Items(){
    /*
  nftcodee="pietroalex100";
    namee= "pianeta";
    pricee: 100;
    imgg= "icon.png";
    arr3.forEach(function (nftcodee,namee,pricee,imgg){
      arr3.push(nftcodee, namee, pricee, imgg);
    })





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

  img: string;
  name: string;
  nftcode: string;
  price: number;



}

