import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import {
  StackConfig,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild('myswing1') swingStack: SwingStackComponent;
	@ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

	cards: Array<any>;
	stackConfig: StackConfig;
	recentCard: string = '';

  constructor(public navCtrl: NavController, private http: Http) {
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
        let removedCard = this.cards.shift();

        if (like) {
          this.recentCard = 'Você gostou de: ' + removedCard.email;
        } else {
          this.recentCard = 'Você não gostou de: ' + removedCard.email;
        }

    }
    this.addNewCards(1);
	}

  trackByCards(index: number, card: any) {
    return card.email;
  }

	addNewCards(count: number) {
	  this.http.get('https://randomuser.me/api/?results=' + count)
	  .map(data => data.json().results)
	  .subscribe(result => {
	    for (let val of result) {
	      this.cards.push(val);
	    }
	  })
	}

	decimalToHex(d, padding) {
	  var hex = Number(d).toString(16);
	  padding = typeof (padding) === "undefined" || padding === null ? 2 : padding;

	  while (hex.length < padding) {
	    hex = "0" + hex;
	  }

	  return hex;
	}

}
