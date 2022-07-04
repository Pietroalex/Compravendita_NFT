import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";


const redirectNotLogged = () => redirectUnauthorizedTo(['']);
const redirectLogged = () => redirectLoggedInTo(['menu']);


const routes: Routes = [



  {
    path: 'menu',
    loadChildren: () => import('./pages/app-core/menu/menu.module').then( m => m.MenuPageModule),
    ...canActivate(redirectNotLogged)
  },
  {
    path: '',
    loadChildren: () => import('./pages/loginall/login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLogged)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/loginall/register/register.module').then( m => m.RegisterPageModule),
    ...canActivate(redirectLogged)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/loginall/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule),
    ...canActivate(redirectLogged)
  },
  {
    path: 'language-popover',
    loadChildren: () => import('./pages/app-core/language-popover/language-popover.module').then( m => m.LanguagePopoverPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
