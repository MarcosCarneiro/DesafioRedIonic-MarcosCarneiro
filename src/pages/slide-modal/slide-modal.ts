import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-slide-modal',
  templateUrl: 'slide-modal.html'
})
export class SlideModal {

  constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    console.log('User Picture: ' + navParams.get('userPicture'));
  }

  dismiss(){
    this.viewCtrl.dismiss('testDismiss');
  }

}
