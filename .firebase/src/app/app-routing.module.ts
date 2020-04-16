import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
