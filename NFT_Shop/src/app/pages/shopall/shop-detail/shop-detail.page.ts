import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  Firestore,
  serverTimestamp,
  setDoc,
  updateDoc
} from "@angular/fire/firestore";
import {InformationService} from "../../../services/user_related/check_user/information.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.page.html',
  styleUrls: ['./shop-detail.page.scss'],
})
export class ShopDetailPage implements OnInit {

  nftcode: string;
  image: string;
  name: string;
  description: string;
  author: string;
  nameauthor: string;
  seller: string;
  onsale_date: Date;
  price: number;

  profile = null;
  nameseller: string;
  uidseller: string;

  money: number;
  Sellerprofile = null;


  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private firestore: Firestore,
    private infoService: InformationService,
    private alertController: AlertController
  ) {
    this.authService.getUserProfile().subscribe((data) => { this.profile = data ;});
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.nftcode = params.get('nftcode');
      this.image = params.get('image');
      this.name = params.get('name');
      this.description = params.get('description');
      this.author = params.get('author');
      this.nameauthor = this.nftcode.substring(0, this.nftcode.indexOf("-"));
      this.seller = params.get('seller');
      this.nameseller = this.seller.substring(0, this.seller.indexOf("-"));
      this.uidseller = this.seller.substring(this.seller.indexOf("-")+1);
      this.onsale_date = new Date(params.get('onsale_date'));
      this.price = Number(params.get('price'));
      this.infoService.getUserProfile(this.uidseller).subscribe((data) => {
        this.Sellerprofile = data;});

    });

  }

  async buynft() {
    let Sellermoney = 0;
    this.money = this.profile.cashart;
    if(this.money >= this.price){

      const seller = this.uidseller;
      const user = this.profile?.uid;

      Sellermoney = this.Sellerprofile.cashart;

      if(seller != user){
      Sellermoney = Sellermoney + this.price;
      this.money = this.money - this.price;
      }


      const OnSaleRef = doc(this.firestore, "NFTs", this.nftcode);
      await setDoc(OnSaleRef, {                                  //crea il documento del OnSaleNFT
        nftcode: this.nftcode,
        image: this.image,
        name: this.name,
        description: this.description,
        author: this.author,

      });
      try {

        const docRef = doc(this.firestore, `Users/${user}`);


        await updateDoc(docRef, {
          privateGallery: arrayUnion(this.nftcode),
          cashart: this.money,
        });
        const SeldocRef = doc(this.firestore, `Users/${seller}`);
        await updateDoc(SeldocRef, {
          cashart: Sellermoney,
        });

        this.showAlert('Item successfully purchased', 'Your item is being added to your gallery')
        await deleteDoc(doc(this.firestore, "OnSaleNFTs", this.nftcode));
        await this.router.navigateByUrl('/gallery', {replaceUrl: true});

        return true;
      } catch (e) {
        return null;
      }

    } else {
      this.showAlert('Purchase Failure', 'The price is too high for your Cashart amount')
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
