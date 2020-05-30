import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {
  @Input('givenItem') item : Item
  @Output() onBuy = new EventEmitter<Item>();
  constructor() { }
  ngOnInit() {
  }
  AddOrRemoveFromCart(i:Item){
    i.addedToCart = !i.addedToCart
    this.onBuy.emit(i)
  }
  
}
