import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/user_related/login/auth.service";
import {getDoc, Firestore, doc} from "@angular/fire/firestore";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  profile = null;
  num = 0;
  constructor(
    private db: Firestore,
    private authService: AuthService

  ) {

    this.authService.getUserProfile().subscribe((data) => { this.profile = data;  this.loadAllNFTs()});
  }

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
     */

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
    }


  }
}
