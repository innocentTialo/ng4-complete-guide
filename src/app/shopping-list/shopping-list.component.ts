import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../_generated/models/ingredient.model';
import {ShoppingListService} from '../_services/shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) {

  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditIngredient(index: number) {
    this.shoppingListService.ingredientsToProcess.next(index);
  }
}
