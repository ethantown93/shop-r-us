import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  
  constructor(private http:HttpClient) { 
  }

  private updateCart = new Subject<any>();
  updateCart$ = this.updateCart.asObservable();

  private itemRemoved = new Subject<any>();
  itemRemoved$ = this.itemRemoved.asObservable();

  private filterList = new Subject<any>();
  filterList$ = this.filterList.asObservable();
  
  getJSON(): Observable<any> {
    return this.http.get('./assets/ListJSONTest.json');
  }

  filterbrand(brand){
    console.log(brand)
    this.filterList.next(brand);
  }

  updatecart(message){
    console.log(message)
    this.updateCart.next(message);
  }

  removeItem(message){
    this.itemRemoved.next(message);
  }

}
