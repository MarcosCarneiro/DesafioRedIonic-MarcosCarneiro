import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import {
  StackConfig,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';

import { User } from '../../model/user';
import { SlideModal } from '../slide-modal/slide-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild('myswing1') swingStack: SwingStackComponent;
	@ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

	cards: Array<User>;
	stackConfig: StackConfig;
  removedCard = new User();
	recentCard: string = '';

  constructor(public navCtrl: NavController, private http: Http, private modalCtrl: ModalController) {
    this.stackConfig = {
  	  throwOutConfidence: (offset, element) => {
  	    return Math.min(Math.abs(offset) / (element.offsetWidth/2), 1);
  	  },
  	  transform: (element, x, y, r) => {
  	    this.onItemMove(element, x, y, r);
  	  },
  	  throwOutDistance: (d) => {
  	    return 800;
  	  }
	  };
  }

  ngAfterViewInit() {
	  this.swingStack.throwin.subscribe((event: DragEvent) => {
	    event.target.style.background = '#ffffff';
	  });

    this.cards = [];
    this.removedCard.setEmail('');
	  this.addNewCards(10);
	}

	onItemMove(element, x, y, r) {
	  var color = '';
	  var abs = Math.abs(x);
	  let min = Math.trunc(Math.min(16*16 - abs, 16*16));
	  let hexCode = this.decimalToHex(min, 2);

	  if (x < 0) {
	    color = '#FF' + hexCode + hexCode;
	  } else {
	    color = '#' + hexCode + 'FF' + hexCode;
	  }

	  element.style.background = color;
	  element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r*1.2}deg)`;
	}

	voteUp(like: boolean) {
    if(this.cards.length > 0){
        this.removedCard = this.cards.shift();

        if (like) {
          this.recentCard = 'Você gostou de: ' + this.removedCard.getEmail();
        } else {
          this.recentCard = 'Você não gostou de: ' + this.removedCard.getEmail();
        }

        console.log(this.recentCard);

    }
    this.addNewCards(1);
	}

  trackByCards(index: number, card: any) {
    return card.getEmail();
  }

	addNewCards(count: number) {
	  this.http.get('https://randomuser.me/api/?results=' + count)
	  .map(data => data.json().results)
	  .subscribe(result => {
	    for (let val of result) {
        let card = new User();

        let DayOfBirth = new Date(val.dob).getTime();
        let currentDate = new Date().getTime();
        let year = (1000*60*60*24*365);
        let age = Math.floor((currentDate - DayOfBirth)/year);

        card.setName(val.name.first);
        card.setEmail(val.email);
        card.setGender(val.gender);
        card.setCity(val.location.city);
        card.setPicture(val.picture.large);
        card.setAge(age);

	      this.cards.push(card);
	    }
	  })
	}

  presentSlideModal(user: User) {
    let slideModal = this.modalCtrl.create(SlideModal, { card: user });
    slideModal.onDidDismiss(vote => {
      if(vote !== undefined && vote !== null) {
        this.voteUp(vote);
      }
    });
    slideModal.present();
  }

  backLastCard() {
    if(!(typeof (this.removedCard.getEmail()) === undefined || this.removedCard.getEmail() === '')) {
      let card = new User();

      card.setName(this.removedCard.getName());
      card.setEmail(this.removedCard.getEmail());
      card.setGender(this.removedCard.getGender());
      card.setCity(this.removedCard.getCity());
      card.setPicture(this.removedCard.getPicture());
      card.setAge(this.removedCard.getAge());
      this.cards.unshift(card);

      this.removedCard.setEmail('');
    }
  }

	decimalToHex(d, padding) {
	  var hex = Number(d).toString(16);
	  padding = typeof (padding) === undefined || padding === null ? 2 : padding;

	  while (hex.length < padding) {
	    hex = "0" + hex;
	  }

	  return hex;
	}

}
