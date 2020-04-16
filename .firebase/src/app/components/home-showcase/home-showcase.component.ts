import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-showcase',
  templateUrl: './home-showcase.component.html',
  styleUrls: ['./home-showcase.component.scss']
})
export class HomeShowcaseComponent implements OnInit {

  backgroundImage: string = './assets/images/home-showcase.jpeg';

  constructor() { }

  ngOnInit() {
  }

}
