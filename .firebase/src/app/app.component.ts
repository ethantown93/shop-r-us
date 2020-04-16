import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shop-proj';

  ngOnInit(){

    this.setUserID();
  }

  setUserID(){

    let isOldUser = localStorage.getItem('user_id');

    if(isOldUser !== null){
      console.log('user already has a user ID.')
      console.log(isOldUser)
      return;
    } else if(isOldUser === null) {
      let UID = Math.random() * (10 - 1) + 1;
      localStorage.setItem('user_id', UID.toString())
      return;
    } else {
      console.log('error')
    }
  }
}
