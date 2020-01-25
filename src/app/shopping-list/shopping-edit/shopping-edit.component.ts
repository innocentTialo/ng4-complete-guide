import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../_shared/models/ingredient.model';
import {ShoppingListService} from '../../_services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('name', {static: false}) name: ElementRef;
  @ViewChild('amount', {static: false}) amount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
  }

  onAddNew() {
    let nameElement = this.name.nativeElement;
    let amountElement = this.amount.nativeElement;
    if (nameElement.value != '' && amountElement.value != '') {
      this.shoppingListService.addIngredient(new Ingredient(nameElement.value, amountElement.value));
    }
    nameElement.value = '';
    amountElement.value = '';
  }
}
