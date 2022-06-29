import { Injectable } from '@angular/core';
import {collection, doc, Firestore, getDoc, getDocs, query, where} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  tempo = [];
  result = [];

  public = null;
  searched: string;

  constructor(
    private firestore: Firestore,
  ) {
  }

  async searchprofile(value: string) {

    const searchRef = collection(this.firestore, "Users");
    const q = query(searchRef, where("username", '>=', value),
      where("username", '<=', value + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {                                       // per trovare tutti gli nft in vendita
      this.tempo.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });

    this.result = this.tempo;
    this.tempo = [];
    return this.result;
  }
  async searchonsale(value: string) {

    const searchRef = collection(this.firestore, "OnSaleNFTs");
    const q = query(searchRef, where("name", '>=', value),
      where("name", '<=', value + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {                                       // per trovare tutti gli nft in vendita
      this.tempo.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });

    this.result = this.tempo;
    this.tempo = [];
    return this.result;
  }
  async searchpublic(value: string) {

    const searchRef = collection(this.firestore, "PublicNFTs");
    const q = query(searchRef, where("name", '>=', value),
      where("name", '<=', value + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {                                       // per trovare tutti gli nft in vendita
      this.tempo.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });

    this.result = this.tempo;
    this.tempo = [];
    return this.result;
  }

  checksearch() {
    let type = localStorage.getItem('search-filed');
    let res;
    switch (type) {
      case "profile":
        res = 'Users';
        this.searched = "username";
        break;
      case "salenft":
        res = 'OnSaleNFTs';
        this.searched = "name";
        break;
      case "publicnft":
        res = 'PublicNFTs';
        this.searched = "name";
        break;

    }
    return res;
  }

}
