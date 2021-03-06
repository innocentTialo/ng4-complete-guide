import { Injectable } from '@angular/core';
import { Recipe } from '../_generated/models/recipe.model';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../_generated/models/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSubject = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Recipe test',
           'A bizarre recipe',
            'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
            [
                new Ingredient('buns', 5),
                new Ingredient('meat', 15)
            ]
    ),
    new Recipe('Another recipe',
           'Another bizarre recipe',
            'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg',
            [
              new Ingredient('beans', 5),
              new Ingredient('meat', 15)
            ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientToAShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.republishRecipes();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.republishRecipes();
  }

  republishRecipes() {
    this.recipeSubject.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.republishRecipes();
  }
}
