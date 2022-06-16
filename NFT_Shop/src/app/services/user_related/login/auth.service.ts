import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";
import {tryCatch} from "rxjs/internal-compatibility";
import { User } from "../../../pages/model/user";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";
import {doc, docData, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) { }


  getUserProfile(){
    const user = this.auth.currentUser.uid;
    const userDocRef = doc(this.firestore, `Users/${user}`);
    return docData(userDocRef);
  }


  async register({ email, password}){
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;

    }catch (e) {
      return null;
    }

  }

  async login({ email, password}){
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;

    }catch (e) {
      return null;
    }
  }
logout(){
    return signOut(this.auth);
}

  getUserId() {
    const user = this.auth.currentUser;
    return user.uid;
  }






}
