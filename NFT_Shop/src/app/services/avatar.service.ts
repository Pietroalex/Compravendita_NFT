import { Injectable } from '@angular/core';

import { Auth } from "@angular/fire/auth";
import {doc, docData, Firestore, setDoc, updateDoc} from "@angular/fire/firestore";
import { getDownloadURL, ref, Storage, uploadString} from "@angular/fire/storage";
import { Photo } from "@capacitor/camera";
import {User} from "../pages/model/user";






@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,

  ) { }

  getUserProfile(){
    const user = this.auth.currentUser.uid;
    const userDocRef = doc(this.firestore, `Users/${user}`);
    return docData(userDocRef);


}





  async uploadImage(cameraFile: Photo){
    const user = this.auth.currentUser.uid;
    const path = `uploads/users_profile/${user}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const docRef = doc(this.firestore, `Users/${user}`);

      await updateDoc(docRef, {
        image: imageUrl,
      });
      return true;
    }catch (e) {
      return null;
    }
  }




}





