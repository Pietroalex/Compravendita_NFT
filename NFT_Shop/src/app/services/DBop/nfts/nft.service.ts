import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, getDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NFT } from "../../../pages/model/NFT";
import {AuthService} from "../../auth.service";
import {Auth} from "@angular/fire/auth";
import {Photo} from "@capacitor/camera";
import {getDownloadURL, ref, uploadString, Storage} from "@angular/fire/storage";
import {FormGroup} from "@angular/forms";

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
    private authService: AuthService
  ) {
    //this.author = this.getUserName();
    //this.itemcount = this.getUserCount();
    //this.nftcode = this.author+this.itemcount;
  }

  createNFT(item: NFT) {
    const nftRef = collection(this.firestore, 'NFTS');
    return addDoc(nftRef, item);
  }
  async getUser() {
    const uid = this.authService.getUserId();
    const docRef = doc(this.firestore, "Users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  }
  /*
  getUserName(){
    const user = this.auth.currentUser.uid;
    const author = user.username;
    return author;
  }
  getUserCount(){
    const user = this.auth.currentUser.uid;
    const itemcount = user.nft_created_count;
    return itemcount;
}
  async uploadImage(cameraFile: Photo){
    const nft = this.auth.currentUser;
    const path = `uploads/${nft.nftcode}/image.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const nftDocRef = doc(this.firestore, `nfts/${nft.nftcode}`);
      await setDoc(nftDocRef, {
        imageUrl,
      });
      return true;
    }catch (e) {
      return null;
    }
  }



   */


}
