import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import {MenuPage} from "./menu.page";

const redirectNotLogged = () => redirectUnauthorizedTo(['']);

const menuRoutes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
  children : [

  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'edit_profile',
    loadChildren: () => import('../../profileall/edit_profile/edit_profile.module').then(m => m.RegistrationPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('../../loginall/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'shop',
    loadChildren: () => import('../../shopall/shop/shop.module').then(m => m.ShopPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'profile',
    loadChildren: () => import('../../profileall/profile/profile.module').then(m => m.ProfilePageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'notification',
    loadChildren: () => import('../../notification/notification.module').then( m => m.NotificationPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'gallery',
    loadChildren: () => import('../../galleryall/gallery/gallery.module').then( m => m.GalleryPageModule),
    ...canActivate(redirectNotLogged)
  },

  {
    path: 'shop-detail',
    loadChildren: () => import('../../shopall/shop-detail/shop-detail.module').then( m => m.ShopDetailPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'shop-detail/:nft',
    loadChildren: () => import('../../shopall/shop-detail/shop-detail.module').then( m => m.ShopDetailPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'search',
    loadChildren: () => import('../../shopall/search/search.module').then( m => m.SearchPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'gallery-detail',
    loadChildren: () => import('../../galleryall/gallery-detail/gallery-detail.module').then( m => m.GalleryDetailPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'new-item',
    loadChildren: () => import('../../galleryall/new-item/new-item.module').then( m => m.NewItemPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'sell-item',
    loadChildren: () => import('../../galleryall/sell-item/sell-item.module').then( m => m.SellItemPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'nft-sold',
    loadChildren: () => import('../../profileall/nft_based/nft-sold/nft-sold.module').then(m => m.NftSoldPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'nft-purchased',
    loadChildren: () => import('../../profileall/nft_based/nft-purchased/nft-purchased.module').then(m => m.NftPurchasedPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'purchase-detail',
    loadChildren: () => import('../../profileall/nft_based/purchase-detail/purchase-detail.module').then(m => m.PurchaseDetailPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'publicuser-gallery',
    loadChildren: () => import('../../profileall/nft_based/publicuser-gallery/publicuser-gallery.module').then(m => m.PublicuserGalleryPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'publicuser-profile',
    loadChildren: () => import('../../profileall/publicuser-profile/publicuser-profile.module').then( m => m.PublicuserProfilePageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: 'publicuseritem-detail',
    loadChildren: () => import('../../profileall/nft_based/publicuseritem-detail/publicuseritem-detail.module').then(m => m.PublicuseritemDetailPageModule),
    ...canActivate(redirectNotLogged)
  },

  ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(menuRoutes)],
  exports: [RouterModule],
})

export class MenuPageRoutingModule {}
