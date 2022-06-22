import { Injectable } from '@angular/core';
import {doc, docData, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor(
    private firestore: Firestore
  ) { }


  getUserProfile(value: string) {
    const user = value;
    const userDocRef = doc(this.firestore, `Users/${user}`);
    return docData(userDocRef);
  }
}
