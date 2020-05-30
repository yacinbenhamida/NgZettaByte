import { Component, OnInit } from '@angular/core';
import {Item} from '../models/item'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  items: Item[] = [
    {
      name: 'Kokorowatari',
      image: 'https://i.imgur.com/POR1PVd.jpg',
      price: 444,
      addedToCart: false,
      desc: `
        Demon sword that harms and effectively kills oddities.
        The sword belonged to a powerful vampire named Kiss-Shot Acerola-Orion Heart-Under-Blade.`
    },
    {
      name: 'Star Platinum',
      image: 'https://i.imgur.com/cdJ6GDW.jpg',
      price: 555,
      addedToCart: false,
      desc: `Star Platinum is the Stand of Kujo Jotaro.
      It has long, flowing hair, and resembling a tall, well-built man.
      It is silent, except when it throws punches, during which it cries "ORAORAORA" loudly and repeatedly.`
    },
    {
      name: 'The World',
      price: 500,
      addedToCart: false,
      image: 'https://i.imgur.com/3KBm7hK.jpg',
      desc: `The World is the Stand of DIO. The World shows no particular personality,
      although it occasionally smiles as it pummels others,
      hinting that it may be a rather cruel entity that takes pleasure in causing pain.
      Its Stand cry, seemingly communicated by DIO, is Muda Muda Muda!`
    },
    {
      name: '3D Maneuver Gear',
      price: 200,
      addedToCart: false,
      image: 'https://i.imgur.com/9E0Agn2.jpg',
      desc: `The vertical maneuvering equipment is a set of equipment developed by humans allowing for great mobility.
      The equipment enables the user to fight in a 3D space as opposed to a 2D one.
      The equipment itself takes the form of a body harness that encompasses much of the body below the neck.`
    },
    {
      name: 'Excalibur',
      price: 300,
      addedToCart: false,
      image: 'https://i.imgur.com/nutN73L.jpg',
      desc: `Excalibur: Sword of Promised Victory is the strongest and most majestic holy sword that symbolizes King Arthur.
      As that which can be called the physical actualization of her ideals and the symbol of her heroism,
      it is her greatest and most powerful Noble Phantasm.`
    },
    {
      name: 'Dragon Slayer',
      price: 450,
      addedToCart: false,
      image: 'https://i.imgur.com/WPdYq5Z.jpg',
      desc: `It was too big to be called a sword. Massive, thick, heavy, and far too rough.
      Indeed, it was a heap of raw iron.
      The Dragon Slayer is the massive sword Guts has wielded as his signature weapon since surviving the Eclipse.`
    },
  ];
  breakpoint:number = 3 
  selectedItems : Item[] = []
  total = 0;
  durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if(window.innerWidth <= 800){
      this.breakpoint = 1;
    }
    else if(window.innerWidth <= 1100){
      this.breakpoint = 2
    }
    else this.breakpoint = 3
  }
  openSnackBar(message,action) {
    this._snackBar.open(message,action,{
      duration: this.durationInSeconds * 1000,
    });
  }
  onResize(event){
    if(event.target.innerWidth <= 800){
      this.breakpoint = 1;
    }
    else if(event.target.innerWidth <= 1100){
      this.breakpoint = 2
    }
    else this.breakpoint = 3
  }
  onBuy(event){
    if(event.addedToCart){
      this.selectedItems.push(event)
      this.total += event.price
    }
    else{
      const index: number = this.selectedItems.indexOf(event);
      if (index !== -1) {
          this.selectedItems.splice(index, 1);
      }      
      this.total -= event.price
    }
  }
  confirmSale(){
    if (this.total > 1000){
      this.openSnackBar("You don't have enough gold !","OK")
      return
    }
    if(this.selectedItems.length > 0 && this.total > 0 && this.total <= 1000){
      this.openSnackBar('Transaction success!',"OK")
    }
    else this.openSnackBar('Please buy something',"OK")
  }
}
