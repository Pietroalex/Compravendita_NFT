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

  },
  {
    path: 'edit_profile',
    loadChildren: () => import('../../profileall/edit_profile/edit_profile.module').then(m => m.RegistrationPageModule),

  },
  {
    path: 'shop',
    loadChildren: () => import('../../shopall/shop/shop.module').then(m => m.ShopPageModule),

  },
  {
    path: 'profile',
    loadChildren: () => import('../../profileall/profile/profile.module').then(m => m.ProfilePageModule),

  },
  {
    path: 'notification',
    loadChildren: () => import('../../notification/notification.module').then( m => m.NotificationPageModule),

  },
  {
    path: 'gallery',
    loadChildren: () => import('../../galleryall/gallery/gallery.module').then( m => m.GalleryPageModule),

  },

  {
    path: 'shop-detail',
    loadChildren: () => import('../../shopall/shop-detail/shop-detail.module').then( m => m.ShopDetailPageModule),

  },
  {
    path: 'shop-detail/:nft',
    loadChildren: () => import('../../shopall/shop-detail/shop-detail.module').then( m => m.ShopDetailPageModule),

  },
  {
    path: 'search',
    loadChildren: () => import('../../shopall/search/search.module').then( m => m.SearchPageModule),

  },
  {
    path: 'gallery-detail',
    loadChildren: () => import('../../galleryall/gallery-detail/gallery-detail.module').then( m => m.GalleryDetailPageModule),

  },
    {
      path: 'gallery-detail:nftcode',
      loadChildren: () => import('../../galleryall/gallery-detail/gallery-detail.module').then( m => m.GalleryDetailPageModule),

    },
  {
    path: 'new-item',
    loadChildren: () => import('../../galleryall/new-item/new-item.module').then( m => m.NewItemPageModule),

  },
  {
    path: 'sell-item',
    loadChildren: () => import('../../galleryall/sell-item/sell-item.module').then( m => m.SellItemPageModule),

  },
  {
    path: 'nft-sold',
    loadChildren: () => import('../../profileall/nft_based/nft-sold/nft-sold.module').then(m => m.NftSoldPageModule),

  },
  {
    path: 'nft-purchased',
    loadChildren: () => import('../../profileall/nft_based/nft-purchased/nft-purchased.module').then(m => m.NftPurchasedPageModule),

  },
  {
    path: 'purchase-detail',
    loadChildren: () => import('../../profileall/nft_based/purchase-detail/purchase-detail.module').then(m => m.PurchaseDetailPageModule),

  },
  {
    path: 'publicuser-gallery',
    loadChildren: () => import('../../profileall/nft_based/publicuser-gallery/publicuser-gallery.module').then(m => m.PublicuserGalleryPageModule),

  },
  {
    path: 'publicuser-profile',
    loadChildren: () => import('../../profileall/publicuser-profile/publicuser-profile.module').then( m => m.PublicuserProfilePageModule),

  },
    {
      path: 'publicuser-profile/:author',
      loadChildren: () => import('../../profileall/publicuser-profile/publicuser-profile.module').then( m => m.PublicuserProfilePageModule),

    },
    {
      path: 'publicuseritem-detail',
      loadChildren: () => import('../../profileall/nft_based/publicuseritem-detail/publicuseritem-detail.module').then(m => m.PublicuseritemDetailPageModule),

    },
  ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(menuRoutes)],
  exports: [RouterModule],
})

export class MenuPageRoutingModule {}
