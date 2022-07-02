import { Injectable } from '@angular/core';
import {
  arrayRemove,
  collection, deleteDoc,
  doc, docData,
  Firestore,
  getDocs, orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  nftcode: string;
  image: string;
  name: string;
  price: number;
  seller: string;



  buyerprofile = null;
  sellerprofile = null;

  tempo = [];
  tempo2 = [];
  notifyarr = [];
  notifyarr2 = [];

  constructor(
    private firestore: Firestore
  ) { }


  async notify(profile: any, seller: any, param: any) {
    this.buyerprofile = profile;
    this.sellerprofile = seller;

    this.nftcode = param.get('nftcode');
    this.image = param.get('image');
    this.name = param.get('name');
    this.price = Number(param.get('price'));

    if(
      this.buyerprofile.uid != this.sellerprofile.uid
    ){
      this.createnotify();

    }

  }

  async createnotify() {
    const purchaseRef = doc(collection(this.firestore, `Notifications`));
    await setDoc(purchaseRef, {                                  //crea il documento del PurchasedNFT
      nftcode: this.nftcode,
      image: this.image,
      name: this.name,
      price: this.price,

      buyer: this.buyerprofile.username + "-" + this.buyerprofile.uid,
      seller: this.sellerprofile.uid,
      purchase_date: serverTimestamp(),
    });
    console.log("notificato")
    localStorage.setItem('notif', "background-color: #3684ff;")
    let val = localStorage.getItem('notif')
    document.getElementById('notify').setAttribute("style", val)

  }

  async loadNotify( user: string){
    const nftHistoryRef = collection(this.firestore, "Notifications");
    const q = query(nftHistoryRef, where("seller", "==", user), orderBy("purchase_date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {            // per trovare documenti con seller o buyer uguale a quello inserito
      this.tempo.push(doc.data()) ;
      this.tempo2.push(doc.id) ;
    });

    this.notifyarr = this.tempo;
    this.notifyarr2 = this.tempo2
    this.tempo = [];
    this.tempo2 = [];
    let arr = this.notifyarr.concat(this.notifyarr2);
  return arr;
  }
  async delete1Notify(id: any){
    await deleteDoc(doc(this.firestore, "Notifications", id));
  }

  async load1SoldNFTs(nftcode)
  {
    let tempo
    const nftHistoryRef = collection(this.firestore, `SoldNFTs`);
    const q = query(nftHistoryRef, where("nftcode", "==", nftcode));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {            // per trovare documenti con seller o buyer uguale a quello inserito
      tempo = doc.data() ;

    });

    return tempo
  }
}
