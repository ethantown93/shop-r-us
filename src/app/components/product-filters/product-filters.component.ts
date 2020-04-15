import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductServiceService } from '../../services/product-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnInit {

  filterForm = new FormGroup({
    brand_name: new FormControl()
  })

  filterForm2 = new FormGroup({
    title: new FormControl()
  })

  _currentValues;

  array = [];

  brand: boolean = false;
  title: boolean = false;

  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return '$' + value;
    }
  }

  constructor(private product: ProductServiceService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  // function to filter brand names
  onSubmit(message, action) {

    let form_value = this.filterForm.value
    let data;

    this.product.getJSON().subscribe(res => {
      let data = res.List;

      let x = this.filterBrand(data, form_value);

      if (x === true) {
        this.product.filterbrand(this.array)
      } else if (x === false) {
        this.openSnackBar(message, action)
      }
    })
  }

  // function to filter title names
  onSubmit2(message, action) {

    let form_value = this.filterForm2.value
    console.log(form_value)
    let data;

    this.product.getJSON().subscribe(res => {
      let data = res.List;

      let x = this.filterTitle(data, form_value);

      if (x === true) {
        this.product.filterbrand(this.array)
      } else if (x === false) {
        this.openSnackBar(message, action)
      }
    })
  }

  // filter array for given brand name 
  filterBrand(arr, form) {
    this.array = [];
    let contains = arr.filter((object) => {
      if (object.brand == form.brand_name) {
        this.array.push(object);
      }
      return object.brand == form.brand_name
    }).length >= 1;
    return contains
  }

  // filter array for given title
  filterTitle(arr, form) {
    this.array = [];
    let contains = arr.filter((object) => {
      if (object.caption == form.title) {
        this.array.push(object);
      }
      return object.caption == form.title
    }).length >= 1;
    return contains
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, { duration: 3000 });
  }


  // function to check price ranges
  getValues() {
    this.product.getJSON().subscribe(res => {
      let data = res.List;

      let array = [];

      for (let x of data) {
        if (x.price >= this.minValue && x.price <= this.maxValue) {
          array.push(x);
        }
      }
      this.product.filterbrand(array);

    })
  }

  // function for selecting filter
  filter(selection, message, action) {

    if (selection === 'brand') {

      this.brand = true;
      this.title = false;
    } else if (selection === 'title') {
      this.title = true;
      this.brand = false;

    } else if (selection === 'in') {

      this.product.getJSON().subscribe(res => {
        this.array = res.List;
        let newArray = [];

        this.array.forEach((item) => {
          if (item.isAvailable === true) {
            newArray.push(item)
          }
        })
        this.product.filterbrand(newArray);
        this.openSnackBar(message, action);
      })
    } else if (selection === 'out') {
      this.product.getJSON().subscribe(res => {
        this.array = res.List;

        let newArray = [];

        this.array.forEach((item) => {
          if (item.isAvailable === false) {
            newArray.push(item)
          }
        })
        this.product.filterbrand(newArray);
        this.openSnackBar(message, action);

      })
    } else if (selection === 'alphabetical') {
      this.product.getJSON().subscribe(res => {
        this.array = res.List;
        this.array.sort((a, b) => a.caption.localeCompare(b.caption))
        this.product.filterbrand(this.array);
        this.openSnackBar(message, action);

      })
    } else if (selection === 'brand-az') {
      this.product.getJSON().subscribe(res => {
        this.array = res.List;
        this.array.sort((a, b) => a.brand.localeCompare(b.brand))
        this.product.filterbrand(this.array);
        this.openSnackBar(message, action);
      })
    } else if ( selection === 'price'){
      this.product.getJSON().subscribe(res => {
        this.array = res.List;
        this.array.sort((a, b) => { return a.price - b.price })
        this.product.filterbrand(this.array);
        this.openSnackBar(message, action);
      })
    }
  }

  removeFilters() {
    this.product.getJSON().subscribe(res => {
      this.array = res.List;
      this.product.filterbrand(this.array)
    })
  }

}
