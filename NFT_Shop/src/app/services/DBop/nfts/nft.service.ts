import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, getDoc, query, where, getDocs, orderBy, limit
} from '@angular/fire/firestore';

import {Auth} from "@angular/fire/auth";
import {Photo} from "@capacitor/camera";
import {getDownloadURL, ref, uploadString, Storage} from "@angular/fire/storage";
import {Observable} from "rxjs";

import {AuthService} from "../../user_related/login/auth.service";

export interface NFT {
  nftcode?: string;
  image: string;
  name: string;
  description: string;
  author: string;
}
export interface OnSaleNFT{
  nftcode?: string;
  image: string;
  name: string;
  description: string;
  author: string;
  seller: string;
  onsale_date: Date;
  price: number;
}
@Injectable({
  providedIn: 'root'
})

export class NftService {
  profile = null;

  nfts = [];
  tempo = [];

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage: Storage,
    private authService: AuthService
  ) {
    this.authService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }


  async uploadNFTImage(cameraFile: Photo, nftcode: string) {

    const path = `uploads/nft_images/${nftcode}/nftimage.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const docRef = doc(this.firestore, `NFTs/${nftcode}`);

      await updateDoc(docRef, {
        image: imageUrl,
      });
      return true;
    } catch (e) {
      return null;
    }
  }


   async loadAllGalleryNFTs(nftcode)//: Observable<NFT>
   {
     const collRef = collection(this.firestore, "NFTs");                                // per trovare tutti gli nft in in gallery
     const q = query(collRef, where('nftcode', '==', nftcode));
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
       this.tempo.push(doc.data());
     })

     this.nfts = this.tempo;
     this.tempo = [];
     return this.nfts;

   }

  async loadAllOnSaleNFTs(){
    const collRef = collection(this.firestore, "OnSaleNFTs");
    const q = query(collRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {                                       // per trovare tutti gli nft in vendita
    this.tempo.push(doc.data());
    console.log(doc.id, " => ", doc.data());
  });

  this.nfts = this.tempo;
  this.tempo = [];
  return this.nfts;
  }

  async get6lastonsaleNFTs(){
    const onsalesRef = collection(this.firestore, "OnSaleNFTs");
    const q = query(onsalesRef, orderBy("onSale_date", "desc"), limit(6));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.tempo.push(doc.data());
    })

    this.nfts = this.tempo;
    this.tempo = [];
    return this.nfts;

    }
  async get3lastselleronsaleNFTs(){
    const onsalesRef = collection(this.firestore, "OnSaleNFTs");
    const q = query(onsalesRef, orderBy("onSale_date", "desc"), limit(3));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.tempo.push(doc.data());
    })

    this.nfts = this.tempo;
    this.tempo = [];
    return this.nfts;

  }
  async get3publicNFTs(){
    const onsalesRef = collection(this.firestore, "NFTs");
    const q = query(onsalesRef, limit(3));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.tempo.push(doc.data());
    })

    this.nfts = this.tempo;
    this.tempo = [];
    return this.nfts;

  }


  async loadAllSellerOnSaleNFTs(seller: string) {
    const collRef = collection(this.firestore, "OnSaleNFTs");
    const q = query(collRef, where('seller', '==', seller));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {                                       // per trovare tutti gli nft in vendita
      this.tempo.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });

    this.nfts = this.tempo;
    this.tempo = [];
    return this.nfts;
  }
}
