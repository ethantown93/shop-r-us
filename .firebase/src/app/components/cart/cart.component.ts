import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private product: ProductServiceService) { }

  products: Array<any>;
  cartTotal: number = 0;

  ngOnInit() {

    this.products = JSON.parse(localStorage.getItem('items'));

    this.addTotal();

  }

    // function to get items from LS and remove the selected cart item
    removeItem(product) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach((item, index) => {
        if (product.prodId === item.prodId) {
          items.splice(index, 1);
          localStorage.setItem('items', JSON.stringify(items));
          this.products = JSON.parse(localStorage.getItem('items'));
          this.product.removeItem('remove-item')
        }
      })
      this.addTotal();
    }
  

  addTotal() {

    let totalArray = [];

    for (let item of this.products) {
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
