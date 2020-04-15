import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-top-nav-cart',
  templateUrl: './top-nav-cart.component.html',
  styleUrls: ['./top-nav-cart.component.scss']
})
export class TopNavCartComponent implements OnInit {

  items;
  cartTotal: number = 0;

  constructor(private product: ProductServiceService) { }

  ngOnInit() {
    this.getItemsFromLs();

    // subject listener to update the cart when items are added
    this.product.updateCart$.subscribe(res => {
      if (res) {
        console.log(res)
        this.getItemsFromLs();
      }
    })
  }

  // function to get items from LS and store them in a local variable
  getItemsFromLs() {
    if (!localStorage.getItem('items')) {
      this.items = [];
    } else {
      this.items = JSON.parse(localStorage.getItem('items'));
      this.addTotal()
    }

  }

  // function to get items from LS and remove the selected cart item
  removeItem(product) {
    let items = JSON.parse(localStorage.getItem('items'));
    items.forEach((item, index) => {
      if (product.prodId === item.prodId) {
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        this.items = JSON.parse(localStorage.getItem('items'));
        this.product.removeItem('remove-item')
      }
    })
    this.addTotal();
  }

  addTotal() {

    let totalArray = [];

    for (let item of this.items) {
      if (item.quantity > 0) {
        let a = item.price * item.quantity;
        totalArray.push(a);
        
      let real_total = totalArray.reduce(this.sumArray)
      this.cartTotal = real_total.toFixed(2);
      }
    }


  }

  sumArray(num1, num2) {
    return num1 + num2;
  }
}
