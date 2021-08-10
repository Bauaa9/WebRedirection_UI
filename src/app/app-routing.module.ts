import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartTableComponent } from './cart-table/cart-table.component';
import { DisplayProductComponent } from './display-products/display-product.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'cart',
    component: CartTableComponent,
  },
  { path: 'select-products', component: DisplayProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
