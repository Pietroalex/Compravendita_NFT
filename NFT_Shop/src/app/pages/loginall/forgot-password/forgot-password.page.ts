import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {AuthGuard} from "@angular/fire/auth-guard";
import {Auth, getAuth, sendPasswordResetEmail} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  credentials: FormGroup;


  constructor( private fb: FormBuilder,
               private auth: Auth,
               private router: Router) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

    });
}
  get email(){
    return this.credentials.get('email');
  }

  ngOnInit() {
  }
  async reset() {
    const auth = getAuth();
    sendPasswordResetEmail(auth, this.credentials.controls['email'].value)
      .then(() => {
        // Password reset email sent!

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }
}
