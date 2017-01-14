import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { User } from '../../model/user';


@Component({
  selector: 'page-slide-modal',
  templateUrl: 'slide-modal.html'
})
export class SlideModal {

  slides : Array<any>;
  card = new User;

  constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    this.slides = [];
    this.card = this.navParams.get('card');
    this.requirePictures();
  }

  requirePictures() {
    this.slides.push(this.card.getPicture());

    this.slides.push('http://lorempixel.com/640/427/sports/');
    this.slides.push('http://lorempixel.com/640/427/city/');
    this.slides.push('http://lorempixel.com/640/427/fashion/');
  }

  dismiss(vote){
    this.viewCtrl.dismiss(vote);
  }

  close(){
    this.navCtrl.pop();
  }

}
