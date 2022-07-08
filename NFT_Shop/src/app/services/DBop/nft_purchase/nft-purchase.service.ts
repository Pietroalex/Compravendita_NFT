import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDocs, limit, orderBy,
  query,
  serverTimestamp,
  setDoc,
  where
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {NFT, OnSaleNFT} from "../nfts/nft.service";

@Injectable({
  providedIn: 'root'
})
export class NftPurchaseService {
  nfts = [];
  tempo = [];
  nftcode: string;
  image: string;
  name: string;
  description: string;
  author: string;
  nameauthor: string;
  seller: string;
  onsale_date: Date;
  price: number;

  nameseller: string;
  uidseller: string;

  buyerprofile = null;
  sellerprofile = null;

  constructor(
    private firestore: Firestore,

  ) { }



  async createHistory(profile: any, Sellerprofile: any, param) {
    console.log(profile)
    console.log(Sellerprofile)
    console.log(param)
    this.buyerprofile = profile;
    this.sellerprofile = Sellerprofile;
    this.nftcode = param.get('nftcode');
    this.image = param.get('image');
    this.name = param.get('name');
    this.description = param.get('description');
    this.author = param.get('author');
    this.nameauthor = this.nftcode.substring(0, this.nftcode.indexOf("-"));
    this.seller = param.get('seller');
    this.nameseller = this.seller.substring(0, this.seller.indexOf("-"));
    this.uidseller = this.seller.substring(this.seller.indexOf("-")+1);
    this.onsale_date = new Date(param.get('onsale_date'));
    this.price = Number(param.get('price'));
    await localStorage.setItem('purchased', JSON.stringify({nft: this.nftcode, check: "nft"}));
    if( this.buyerprofile.uid != this.uidseller
       ){
      await this.createPurchaseHistory();

    }
  }
  async createPurchaseHistory(){
    const purchaseRef = doc(collection(this.firestore, `SoldNFTs` ));
    await setDoc(purchaseRef, {                                  //crea il documento del PurchasedNFT
      nftcode: this.nftcode,
      image: this.image,
      name: this.name,
      description: this.description,
      author: this.author,
      buyer: this.buyerprofile.username + "-" + this.buyerprofile.uid,
      seller: this.nameseller + "-" + this.sellerprofile.uid,
      purchase_date: serverTimestamp(),
      price: this.price,

    });
    console.log("comprato")
  }

  async loadHistory(type: string, user: string){
    const nftHistoryRef = collection(this.firestore, "SoldNFTs");
    const q = query(nftHistoryRef, where(type, "==", user), orderBy("purchase_date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {            // per trovare documenti con seller o buyer uguale a quello inserito
      this.tempo.push(doc.data()) ;

    });
    console.log(this.nfts)
    this.nfts = this.tempo;
    this.tempo = [];
     return this.nfts;
  }

  async get3lastSoldNFTs(type: string, user: string){
    const nftHistoryRef = collection(this.firestore, "SoldNFTs");
    const q = query(nftHistoryRef, where(type, "==", user), orderBy("purchase_date", "desc"), limit(3));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.tempo.push(doc.data());
    })
    this.nfts = this.tempo;
    this.tempo = [];
    return this.nfts;

  }

}

