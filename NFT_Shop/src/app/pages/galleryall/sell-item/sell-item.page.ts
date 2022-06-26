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
import {User} from "../../model/user";
import {timestamp} from "rxjs/operators";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import {AlertController, IonDatetime} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";

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
    private alertController: AlertController
  )
  {
    this.authService.getUserProfile().subscribe((data) => { this.profile = data; });
  }

  ngOnInit() {
    this.nftInfo = this.fb.group({
      price: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],//aggiungere il controllo sull'input per inserire solo numeri che non inizino per 0
    });
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


    async sellItem() {

      //prendere informazioni nft con passaggio da gallery
      //creare il documento nftOnSale
      //cancellare profilo nft
      let price = this.nftInfo.controls['price'].value;
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
          price: price,
        });
        try {
          const user = this.profile?.uid;
          const docRef = doc(this.firestore, `Users/${user}`);

          await updateDoc(docRef, {
            privateGallery: arrayRemove(this.nftcode),
            publicGallery: arrayRemove(this.nftcode)
          });
          this.showAlert('Item On Sale', 'Your item is being published on the shop')
          await deleteDoc(doc(this.firestore, "NFTs", this.nftcode));
          await deleteDoc(doc(this.firestore, "PublicNFTs", this.nftcode));
          await this.router.navigateByUrl('/home', {replaceUrl: true});

          return true;
        } catch (e) {
          return null;
        }

      } else {
        this.showAlert('On Sale Failure', 'The price can be numeric only')
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
