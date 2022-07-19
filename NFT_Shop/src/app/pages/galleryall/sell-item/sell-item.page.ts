import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NftService} from "../../../services/DBop/nfts/nft.service";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {
  arrayRemove,
  arrayUnion, deleteDoc,
  doc,
  Firestore,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc
} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import {AlertController, IonDatetime} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.page.html',
  styleUrls: ['./sell-item.page.scss'],
})
export class SellItemPage implements OnInit {

  nftInfo: FormGroup;
  profile = null;
  nftcode: string;
  image: string;
  name: string;
  description: string;
  author: string;
  nameauthor: string;


  get price() {
    return this.nftInfo.get('price');
  }

  constructor(
    private fb: FormBuilder,
    private nftService: NftService,
    private authService: AuthService,
    private firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private translateService: TranslateService
  )
  {
    this.authService.getUserProfile().subscribe((data) => { this.profile = data; });
  }

  ngOnInit() {
    this.nftInfo = this.fb.group({
      price: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],//aggiungere il controllo sull'input per inserire solo numeri che non inizino per 0
    });
    this.route.paramMap.subscribe(params => {
      this.nftcode = params.get('nftcode');
      this.image = params.get('image');
      this.name = params.get('name');
      this.description = params.get('description');
      this.author = params.get('author');
     this.nameauthor = this.nftcode.substring(0, this.nftcode.indexOf("-"));

    });

  }


    async sellItem() {

      //prendere informazioni nft con passaggio da gallery
      //creare il documento nftOnSale
      //cancellare profilo nft
      let price = this.nftInfo.controls['price'].value;
      let a: any = {};
      this.translateService.get('ALERT.SellItem.title1').subscribe(t => { a.title1 = t; })
      this.translateService.get('ALERT.SellItem.message1').subscribe(t =>{ a.message1 = t; })
      this.translateService.get('ALERT.SellItem.title2').subscribe(t => { a.title2 = t; })
      this.translateService.get('ALERT.SellItem.message2').subscribe(t =>{ a.message2 = t; })

      if (/^[0-9]*$/.test(price)) {
        const OnSaleRef = doc(this.firestore, "OnSaleNFTs", this.nftcode);
        await setDoc(OnSaleRef, {                                  //crea il documento del OnSaleNFT
          nftcode: this.nftcode,
          image: this.image,
          name: this.name,
          description: this.description,
          author: this.author,
          seller: this.profile?.username + "-" + this.profile?.uid,
          onSale_date: serverTimestamp(),
          price: parseInt(price),
        });
        try {
          const user = this.profile?.uid;
          const docRef = doc(this.firestore, `Users/${user}`);

          await updateDoc(docRef, {
            privateGallery: arrayRemove(this.nftcode),
            publicGallery: arrayRemove(this.nftcode)
          });
          this.showAlert(a.title1, a.message1)
          await deleteDoc(doc(this.firestore, "NFTs", this.nftcode));
          await deleteDoc(doc(this.firestore, "PublicNFTs", this.nftcode));
          await this.router.navigateByUrl('/home', {replaceUrl: true});

          return true;
        } catch (e) {
          return null;
        }

      } else {
        this.showAlert(a.title2, a.message2)
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
