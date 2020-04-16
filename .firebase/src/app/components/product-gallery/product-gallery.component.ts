import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements OnInit {

  products: Array<any> = [];

  constructor(private product: ProductServiceService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    // get list of json items
    this.product.getJSON().subscribe(response => {

      this.products = response.List;
    });

    // subject listener for filter changes
    this.product.filterList$.subscribe(res => {
      if (res) {
        this.products = res;
      } 
    })
  }

  addToCart(product, message1, message2, action) {

    let items = []

    // check to see if items exist in LS
    if (!localStorage.getItem('items')) {

      items = [];
      // if no items exist, push selected item to items array
      items.push(product);
      // stringify items array and push to LS
      localStorage.setItem('items', JSON.stringify(items))
      this.product.updatecart('update')
      this.openSnackBar1(message1, action);

    } else {
      // if items exist in LS grab them and parse them back into JSON
      items = JSON.parse(localStorage.getItem('items'))

      // check cart for duplicate itms
      if (items.length > 0) {
        for (let item of items) {
          if (item.prodId === product.prodId) {
            this.openSnackBar2(message2, action);
            product.quantity = 1;
            return;
          }
        }
      }
      // push new item to items array
      items.push(product);
      // reset items in LS
      localStorage.setItem('items', JSON.stringify(items))
      this.product.updatecart('update')
      this.openSnackBar1(message1, action);
    }

    product.quantity = 1;
  }

  // display notification that item is already in cart
  openSnackBar2(message, action) {
    this.snackBar.open(message, action, { duration: 4000 });
  }

  // display notification that item was added to cart

  openSnackBar1(message, action) {
    this.snackBar.open(message, action, { duration: 3000 });
  }

}

