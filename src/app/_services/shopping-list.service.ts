import {Injectable} from '@angular/core';
import {Ingredient} from '../_generated/models/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientsToProcess = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('tomatoes', 10)
  ];

  constructor() {
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  indexOf(ingredient: Ingredient): number {
    return this.ingredients.findIndex(ingredientToUpdate => this.equals(ingredientToUpdate, ingredient));
    //return this.ingredients.indexOf(this.ingredients.find(ingredientToUpdate => ingredientToUpdate.isEqualTo(ingredient)));
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(ingredient => {
      this.addIngredient(ingredient);
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

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.populateIngredients();

  }

  addIngredient(ingredient: Ingredient) {
    const indexOfIngredient = this.indexOf(ingredient);
    if (indexOfIngredient != -1) {
      this.updateIngredient(indexOfIngredient, ingredient);
    } else {
      this.ingredients.push(ingredient);
    }
    this.populateIngredients();
  }

  equals(ingredient: Ingredient, anotherIngredient: Ingredient) {
    return anotherIngredient.name.toLocaleLowerCase() === ingredient.name.toLocaleLowerCase() || ingredient === anotherIngredient;
  }
}
