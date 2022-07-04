import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  deleteDoc,
  updateDoc,
  DocumentReference,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  arrayUnion, increment, arrayRemove
} from '@angular/fire/firestore';

import {Auth} from "@angular/fire/auth";
import {Photo} from "@capacitor/camera";
import {getDownloadURL, ref, uploadString, Storage} from "@angular/fire/storage";
import {Observable} from "rxjs";

import {AuthService} from "../../user_related/login/auth.service";
import {AlertController} from "@ionic/angular";
import {getAuth} from "firebase/auth";
import {Router} from "@angular/router";

export interface NFT {
  nftcode?: string;
  image: string;
  name: string;
  description: string;
  author: string;
}
export interface OnSaleNFT{
  nftcode?: string;
  image: string;
  name: string;
  description: string;
  author: string;
  seller: string;
  onsale_date: Date;
  price: number;
}
@Injectable({
  providedIn: 'root'
})

export class NftService {
  profile = null;

  nfts = [];
  tempo = [];

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage: Storage,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.authService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  async copytopublic(params) {
    let nftcode = params.get('nftcode');
    let image = params.get('image');
    let name = params.get('name');
    let description = params.get('description');
    let author = params.get('author');
    try{
      await setDoc(doc(this.firestore, "PublicNFTs", nftcode), {                                  //crea il documento del NFT
        nftcode: nftcode,
        image: image,
        name: name,
        description: description,
        author: author,
      });

        const user = this.profile.uid;
        const docRef = doc(this.firestore, `Users/${user}`);
        await updateDoc(docRef, {
          publicGallery: arrayUnion(nftcode)               //aggiunge l'nftcode all'array privateGallery dentro il profilo utente corrente
        });


      const alert = await this.alertController.create({
        header: 'Successfully publicised',
        message: 'All users can now admire your piece of art!.',
        buttons: ['OK'],
      });
      await alert.present();

      return true;
    }catch (e) {
      const alert = await this.alertController.create({
        header: 'Unsuccessful publication',
        message: 'There was a problem in the publication of your item.',
        buttons: ['OK'],
      });
      await alert.present();
      return null;
    }
  }

  async uploadNFTImage(cameraFile: Photo, nftcode: string) {

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
    } catch (e) {
      return null;
    }
  }


   async loadAllGalleryNFTs(nftcode)
   {
     const collRef = collection(this.firestore, "NFTs");                                // per trovare tutti gli nft in in gallery
     const q = query(collRef, where('nftcode', '==', nftcode));
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
       this.tempo.push(doc.data());
     })

     this.nfts = this.tempo;
     this.tempo = [];
     return this.nfts;

   }


  async loadAllOnSaleNFTsorder(){
    const collRef = collection(this.firestore, "OnSaleNFTs");
    let q = query(collRef, orderBy("onSale_date", "desc"));
    let input = localStorage.getItem('order-field')
    switch (input) {
      case "newer":
         q = query(collRef, orderBy("onSale_date", "desc"));
        break;
      case "older":
         q = query(collRef, orderBy("onSale_date", "asc"));
        break;

      case "cheaper":
         q = query(collRef, orderBy("price", "asc"));
        break;
      case "expensive":
         q = query(collRef, orderBy("price", "desc"));
        break;
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {                                       // per trovare tutti gli nft in vendita
      this.tempo.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });

    this.nfts = this.tempo;
    this.tempo = [];
    return this.nfts;
  }

  async get6lastonsaleNFTs(){
    const onsalesRef = collection(this.firestore, "OnSaleNFTs");
    const q = query(onsalesRef, orderBy("onSale_date", "desc"), limit(6));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.tempo.push(doc.data());
    })

    this.nfts = this.tempo;
    this.tempo = [];
    return this.nfts;

    }
  async get3lastselleronsaleNFTs(seller){
    const onsalesRef = collection(this.firestore, "OnSaleNFTs");
    const q = query(onsalesRef, orderBy("onSale_date", "desc"), where("seller", "==", seller ), limit(3));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.tempo.push(doc.data());
    })

    this.nfts = this.tempo;
    this.tempo = [];
    return this.nfts;

  }



  async loadAllSellerOnSaleNFTsorder() {
    console.log("Seller")
    let seller = localStorage.getItem('seller')
    const onsalesRef = collection(this.firestore, "OnSaleNFTs");

    let q = query(onsalesRef, orderBy("onSale_date", "desc"), where('seller', '==', seller));
    let input = localStorage.getItem('order-field')
    switch (input) {
      case "newer":
        q = query(onsalesRef, orderBy("onSale_date", "desc"), where('seller', '==', seller));
        break;
      case "older":
        q = query(onsalesRef, orderBy("onSale_date", "asc"), where('seller', '==', seller));
        break;

      case "cheaper":
        q = query(onsalesRef, orderBy("price", "asc"), where('seller', '==', seller));
        break;
      case "expensive":
        q = query(onsalesRef, orderBy("price", "desc"), where('seller', '==', seller));
        break;
    }


    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {                                       // per trovare tutti gli nft in vendita
      this.tempo.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });

    this.nfts = this.tempo;
    this.tempo = [];
    return this.nfts;
  }

  async getpublicNFTs(nftcode: any) {
    {
      const collRef = collection(this.firestore, "NFTs");                                // per trovare gli tutti nft in in public gallery
      const q = query(collRef, where('nftcode', '==', nftcode));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.tempo.push(doc.data());
      })

      this.nfts = this.tempo;
      this.tempo = [];
      return this.nfts;

    }
  }

    async deleteNft(nftcode: any){
      const user = this.profile.uid;
      const docRef = doc(this.firestore, `Users/${user}`);

      await updateDoc(docRef, {
        publicGallery: arrayRemove(nftcode),          //aggiunge l'nftcode all'array privateGallery dentro il profilo utente corrente
        privateGallery: arrayRemove(nftcode),
      });

      await deleteDoc(doc(this.firestore, "NFTs", nftcode));
      await deleteDoc(doc(this.firestore, "PublicNFTs", nftcode));
      this.authService.getUserProfile().subscribe((data) => {
        this.profile = data;
        localStorage.setItem('profile', JSON.stringify(this.profile));
      })

    }


  async deletepublic(nftcode: any) {

    const user = this.profile.uid;
    const docRef = doc(this.firestore, `Users/${user}`);

    await updateDoc(docRef, {
      publicGallery: arrayRemove(nftcode)               //aggiunge l'nftcode all'array privateGallery dentro il profilo utente corrente
    });
    await deleteDoc(doc(this.firestore, "PublicNFTs", nftcode));
    this.authService.getUserProfile().subscribe((data) => {
      this.profile = data;
      localStorage.setItem('profile', JSON.stringify(this.profile));
    })
  }
}
