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

  async search(value: string) {
    let search = await this.checksearch()
    const searchRef = collection(this.firestore, search);
    const q = query(searchRef, where(this.searched, '>=', value),
      where(this.searched, '<=', value + '\uf8ff'));
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
