import {Injectable} from '@angular/core';
import {Ingredient} from '../_generated/models/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientsToProcess = new Subject<Ingredient>();

  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('tomatoes', 10)
  ];

  constructor() {
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addOrEditIngredient(ingredient: Ingredient) {
    this.delete(ingredient);
    this.ingredients.push(ingredient);
    this.populateIngredients();
  }

  indexOf(ingredient: Ingredient): number {
    return this.ingredients.indexOf(this.ingredients.find(ingredientToUpdate => ingredientToUpdate.equals(ingredient)));
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(ingredient => {
      this.addOrEditIngredient(ingredient);
    });
  }

  private populateIngredients() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  delete(ingredient: Ingredient) {
    const indexOfIngredient = this.indexOf(ingredient);
    if (indexOfIngredient != -1) {
      this.ingredients.splice(indexOfIngredient, 1);
    }
    this.populateIngredients();
  }
}
