import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../_generated/models/recipe.model';
import {RecipeService} from '../../_services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  addRecipeToShoppingList() {
    this.recipeService.addIngredientToAShoppingList(this.recipe.ingredients);
  }
}
