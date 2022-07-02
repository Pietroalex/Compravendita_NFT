import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut, browserSessionPersistence
} from "@angular/fire/auth";
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

  getUserId() {
    const user = this.auth.currentUser;
    return user.uid;
  }






}
