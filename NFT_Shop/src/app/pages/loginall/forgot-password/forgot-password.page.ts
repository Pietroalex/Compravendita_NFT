import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {AuthGuard} from "@angular/fire/auth-guard";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  frmPasswordReset: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]]
  });

  constructor( private fb: FormBuilder, private auth: AuthGuard) {
    const email = this.frmPasswordReset.controls['email'].value;


}

  ngOnInit() {
  }


}
