import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {

  itemCounter: any = 0;

  constructor(private product: ProductServiceService) { }

  ngOnInit() {
    this.getItemCount()

    this.product.updateCart$.subscribe( res => {
      if(res){
        this.itemCounter = 0;
        this.getItemCount()
      } else {
        console.log('no message');
      }
    })

    this.product.itemRemoved$.subscribe(res => {
      if(res){
        this.itemCounter--
      } else {
        console.log('no message')
      }
    })

  }

  getItemCount(){
    let items = JSON.parse(localStorage.getItem('items'));

    for(let item in items){
      this.itemCounter++
    }

  }

}
