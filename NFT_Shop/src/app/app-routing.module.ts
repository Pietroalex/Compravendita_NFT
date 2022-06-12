import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

const redirectNotLogged = () => redirectUnauthorizedTo(['']);
const redirectLogged = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/loginall/login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLogged)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/loginall/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/loginall/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'shop',
    loadChildren: () => import('./pages/shopall/shop/shop.module').then(m => m.ShopPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profileall/profile/profile.module').then(m => m.ProfilePageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./pages/galleryall/gallery/gallery.module').then( m => m.GalleryPageModule),
    ...canActivate(redirectNotLogged)
  },

  {
    path: 'shop-detail',
    loadChildren: () => import('./pages/shopall/shop-detail/shop-detail.module').then( m => m.ShopDetailPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'shop-detail/:nft',
    loadChildren: () => import('./pages/shopall/shop-detail/shop-detail.module').then( m => m.ShopDetailPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/shopall/search/search.module').then( m => m.SearchPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'gallery-detail',
    loadChildren: () => import('./pages/galleryall/gallery-detail/gallery-detail.module').then( m => m.GalleryDetailPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'new-item',
    loadChildren: () => import('./pages/galleryall/new-item/new-item.module').then( m => m.NewItemPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'sell-item',
    loadChildren: () => import('./pages/galleryall/sell-item/sell-item.module').then( m => m.SellItemPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'nft-sold',
    loadChildren: () => import('./pages/profileall/nft-sold/nft-sold.module').then( m => m.NftSoldPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'nft-purchased',
    loadChildren: () => import('./pages/profileall/nft-purchased/nft-purchased.module').then( m => m.NftPurchasedPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'purchase-detail',
    loadChildren: () => import('./pages/profileall/purchase-detail/purchase-detail.module').then( m => m.PurchaseDetailPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'publicuser-gallery',
    loadChildren: () => import('./pages/profileall/publicuser-gallery/publicuser-gallery.module').then( m => m.PublicuserGalleryPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'publicuser-profile',
    loadChildren: () => import('./pages/profileall/publicuser-profile/publicuser-profile.module').then( m => m.PublicuserProfilePageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'publicuseritem-detail',
    loadChildren: () => import('./pages/profileall/publicuseritem-detail/publicuseritem-detail.module').then( m => m.PublicuseritemDetailPageModule),
    ...canActivate(redirectNotLogged)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
