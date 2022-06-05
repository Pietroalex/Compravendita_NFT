import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/loginall/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/loginall/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/loginall/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./pages/shopall/shop/shop.module').then(m => m.ShopPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profileall/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./pages/galleryall/gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  /*
  {
    path: 'shop-detail',
    loadChildren: () => import('./pages/shopall/shop-detail/shop-detail.module').then( m => m.ShopDetailPageModule)
  },


   */

  {
    path: 'shop-detail/:nft',
    loadChildren: () => import('./pages/shopall/shop-detail/shop-detail.module').then( m => m.ShopDetailPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/shopall/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'gallery-detail',
    loadChildren: () => import('./pages/galleryall/gallery-detail/gallery-detail.module').then( m => m.GalleryDetailPageModule)
  },
  {
    path: 'new-item',
    loadChildren: () => import('./pages/galleryall/new-item/new-item.module').then( m => m.NewItemPageModule)
  },
  {
    path: 'sell-item',
    loadChildren: () => import('./pages/galleryall/sell-item/sell-item.module').then( m => m.SellItemPageModule)
  },
  {
    path: 'nft-sold',
    loadChildren: () => import('./pages/profileall/nft-sold/nft-sold.module').then( m => m.NftSoldPageModule)
  },
  {
    path: 'nft-purchased',
    loadChildren: () => import('./pages/profileall/nft-purchased/nft-purchased.module').then( m => m.NftPurchasedPageModule)
  },
  {
    path: 'purchase-detail',
    loadChildren: () => import('./pages/profileall/purchase-detail/purchase-detail.module').then( m => m.PurchaseDetailPageModule)
  },
  {
    path: 'publicuser-gallery',
    loadChildren: () => import('./pages/profileall/publicuser-gallery/publicuser-gallery.module').then( m => m.PublicuserGalleryPageModule)
  },
  {
    path: 'publicuser-profile',
    loadChildren: () => import('./pages/profileall/publicuser-profile/publicuser-profile.module').then( m => m.PublicuserProfilePageModule)
  },
  {
    path: 'publicuseritem-detail',
    loadChildren: () => import('./pages/profileall/publicuseritem-detail/publicuseritem-detail.module').then( m => m.PublicuseritemDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
