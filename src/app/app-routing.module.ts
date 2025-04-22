import { EditProductComponent } from './admin/components/edit-product/edit-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './user/components/login/login.component';
import { SignUpComponent } from './user/components/sign-up/sign-up.component';
import { MainNavigathionComponent } from './components/main-navigathion/main-navigathion.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { EditProfileComponent } from './user/components/edit-profile/edit-profile.component';
import { AuthReturnGuard } from './auth/guard/auth-return.guard';
import { DetailsComponent } from './components/details/details.component';
import { SidbarLayoutComponent } from './layout/components/sidbar-layout/sidbar-layout.component';
import { BrowseComponent } from './components/browse/browse.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchComponent } from './components/search/search.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  // layout without headet and footer
  // No layout
  {path : "",redirectTo :"home",pathMatch:'full'},
  {path : "signUp" ,component:SignUpComponent},
  {path:"login",component:LoginComponent },
  {path : "",component:LayoutComponent, children:[

    // No sidebar
    {path : 'editProfile',component : EditProfileComponent,canActivate :[AuthReturnGuard]},
    {path: 'detalis/:prodIdFordetalis',component:DetailsComponent},
    {path: 'cart',component:CartComponent},
    {path: 'checkout',component:CheckoutComponent},
    {path:'search/:slug',component :SearchComponent},
    {path:'editProduct/:prodIdForEditing',component: EditProductComponent},

    // layout with sidebar
    {path:"",component:SidbarLayoutComponent,children:[
      {path:'home',component:HomeComponent},
      {path :'main',component:MainNavigathionComponent },//canActivate :[AuthReturnGuard]
      {path:'browse/:catId',component:BrowseComponent},
      ]},

  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
