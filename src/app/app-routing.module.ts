import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { ProductComponent } from './components/product/product.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: '', component:LoginComponent},
  {path:'home', component:HomeComponent, canActivate: [AuthGuard]},
  {path:'customer',component:CustomerComponent, canActivate: [AuthGuard]},
  {path:'product', component:ProductComponent, canActivate: [AuthGuard]},
  {path:'purchase', component:PurchaseComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
