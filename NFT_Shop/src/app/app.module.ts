import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment} from "../environments/environment";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage-angular";

import { MenuPageModule } from "./pages/app-core/menu/menu.module";
import { provideAuth, getAuth} from "@angular/fire/auth";
import { provideStorage, getStorage} from "@angular/fire/storage";
import { provideFirebaseApp, initializeApp} from "@angular/fire/app";
import { getFirestore, provideFirestore} from "@angular/fire/firestore";
import { ReactiveFormsModule } from "@angular/forms";
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import {LanguagePopoverPageModule} from "./pages/app-core/language-popover/language-popover.module";






export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MenuPageModule,
    ReactiveFormsModule,
    HttpClientModule,
    LanguagePopoverPageModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Camera],
  bootstrap: [AppComponent],
})
export class AppModule {}
