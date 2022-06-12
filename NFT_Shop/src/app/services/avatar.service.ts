import { Injectable } from '@angular/core';
import { Auth } from "@angular/fire/auth";
import {doc, docData, Firestore, setDoc} from "@angular/fire/firestore";
import { Storage, ref } from "@angular/fire/storage";
import {getDownloadURL, uploadString} from "rxfire/storage";

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) { }

getUserProfile(){
const user = this.auth.currentUser;
const userDocRef = doc(this.firestore, 'users/{$user.uid}');
return docData(userDocRef);
}
/*
async uploadImage(){
    const user = this.auth.currentUser;
    const path = 'uploads/${user.uid}/profile.png';
    const storageRef = ref(this.storage, path);

      try{
        await uploadString(storageRef, cameraFile.base, 'base64');

        const imageUrl = await getDownloadURL(storageRef);

        const userDocRef = doc(this.firestore, 'users/${user.uid}');
        await setDoc(userDocRef, {
          imageUrl,
        });
        return true;
      }catch (e) {
        return null;
      }

}

 */
}
