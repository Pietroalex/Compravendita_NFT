import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Router} from "@angular/router";
import {doc, getDoc} from "@angular/fire/firestore";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  async loadAllNFTs(){
    /*
    const q = query(collection(this.db, "NFTs"), where('nftcode', '>=', this.profile?.username), where('nftcode', '<=',  '-'));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });


    let privateGallery = this.profile?.privateGallery;
    for (const nftcode of privateGallery) {
      const docRef = doc(this.db, "NFTs", nftcode);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        this.num++;
        console.log(this.num)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

     */
    }
}
