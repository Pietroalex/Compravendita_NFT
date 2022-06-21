import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, getDoc
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


   loadAllNFTs(nftcode): Observable<NFT> {
    /*
    const q = query(collection(this.db, "NFTs"), where('nftcode', '>=', this.profile?.username), where('nftcode', '<=',  '-'));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
     */



      const docRef = doc(this.firestore, `NFTs/${nftcode}`);
      return docData(docRef, {idField: 'nftcode'}) as Observable<NFT>;


  }
  loadAllOnSaleNFTs(): Observable<OnSaleNFT[]> {
    /*
    const q = query(collection(this.db, "NFTs"), where('nftcode', '>=', this.profile?.username), where('nftcode', '<=',  '-'));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
     */
    const collRef = collection(this.firestore, `OnSaleNFTs`);
    return collectionData(collRef, {idField: 'nftcode'}) as Observable<OnSaleNFT[]>;
  }

}
