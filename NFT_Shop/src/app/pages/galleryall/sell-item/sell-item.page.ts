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
import {IonDatetime} from "@ionic/angular";

@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.page.html',
  styleUrls: ['./sell-item.page.scss'],
})
export class SellItemPage implements OnInit {

  nftInfo: FormGroup;
  profile = null;

  get price() {
    return this.nftInfo.get('price');
  }

  constructor(
    private fb: FormBuilder,
    private nftService: NftService,
    private authService: AuthService,
    private firestore: Firestore
  )
  {
    this.authService.getUserProfile().subscribe((data) => { this.profile = data; });
  }

  ngOnInit() {
    this.nftInfo = this.fb.group({
      price: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],//aggiungere il controllo sull'input per inserire solo numeri che non inizino per 0
    });
  }


   /* async sellItem(){

    //prendere informazioni nft con passaggio da gallery
      //creare il documento nftOnSale
    //cancellare profilo nft
      let price = this.nftInfo.controls['price'].value;
      await setDoc(doc(this.firestore, "OnSaleNFTs", nftcode), {                                  //crea il documento del NFT
        nftcode: nftcode,
        image: "img",
        name: name,
        description: desc,
        author: author,
        creationDate: date,
        seller: this.authService.getUserId(),
        onSale_date: serverTimestamp(),
        price: price,
      });
      try {
        const user = this.profile?.uid;
        const docRef = doc(this.firestore, `Users/${user}`);

        await updateDoc(docRef, {

          privateGallery: arrayRemove(nftcode),
          publiceGallery: arrayRemove(nftcode)
        });

        return true;
      }catch (e) {
        return null;
      }
      await deleteDoc(doc(this.firestore, "NFTs", nftcode));
    }

    */
}
