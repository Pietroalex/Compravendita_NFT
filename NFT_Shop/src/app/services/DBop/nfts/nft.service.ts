import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, getDoc
} from '@angular/fire/firestore';

import {Auth} from "@angular/fire/auth";
import {Photo} from "@capacitor/camera";
import {getDownloadURL, ref, uploadString, Storage} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class NftService {
  author = null;
  itemcount = null;
  nftcode: null;


  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage: Storage,

  ) {

  }



  async uploadNFTImage(cameraFile: Photo, nftcode: string){

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
    }catch (e) {
      return null;
    }
  }


}
