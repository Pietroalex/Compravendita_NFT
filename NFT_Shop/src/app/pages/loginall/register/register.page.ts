import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {AuthService} from "../../../services/user_related/login/auth.service";
import {Router} from "@angular/router";
import {collection, doc, Firestore, getDocs, query, setDoc, where} from "@angular/fire/firestore";
import {Auth, createUserWithEmailAndPassword, getAuth, signInWithRedirect} from "@angular/fire/auth";
import firebase from "firebase/compat";
import AuthProvider = firebase.auth.AuthProvider;


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registers: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private db: Firestore,

  ) {
  }



  ngOnInit() {

    this.registers = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      bio: [''],
    });
  }
  async register() {
    let uid = null;
    const auth = getAuth();
    let email = this.registers.controls['email'].value;
    let password = this.registers.controls['password'].value;
    let username = this.registers.controls['username'].value;
    let bio = this.registers.controls['bio'].value;
    const result = await this.checkUsername(username);
    if (result) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user.uid;
            await setDoc(doc(this.db, "Users", user), {
              uid: uid,
              username: username,
              image: `https://firebasestorage.googleapis.com/v0/b/nft-shop-c77dd.appspot.com/o/uploads%2Ficon.png?alt=media&token=0c5b1aa1-f887-404c-a0b4-cd2ad8c6fa64`,
              email: email,
              bio: bio,
              cashart: 5000,
              nft_created_count: 0,
            });
        this.router.navigateByUrl('/menu/home', {replaceUrl: true});


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.showAlert('Registration failed', 'Please check if you have typed a <b>valid email</b> (ex: <b>example@email.com</b>) and/or a <b>valid password</b> (<b>it requires a minimum length of 6</b>) and try again!');

      });
    } else {
      this.showAlert('Registration failed', 'The username you typed in is already taken, please pick one different')
    }
  }


  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async checkUsername(username: string){
    const usersRef = collection(this.db, "Users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return(querySnapshot.empty);

    /*
    querySnapshot.forEach((doc) => {                                        per trovare documenti con username uguale a quello inserito
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

     */
  }


}
