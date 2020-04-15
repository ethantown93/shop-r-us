import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ProductServiceService } from '../app/services/product-service.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';
import { TopNavCartComponent } from './components/top-nav-cart/top-nav-cart.component';
import { HomeShowcaseComponent } from './components/home-showcase/home-showcase.component';
import { HomeComponent } from './components/home/home.component';
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarTopComponent,
    TopNavCartComponent,
    HomeShowcaseComponent,
    HomeComponent,
    ProductGalleryComponent,
    ProductFiltersComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    Ng5SliderModule
    
    ],
  providers: [ProductServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
