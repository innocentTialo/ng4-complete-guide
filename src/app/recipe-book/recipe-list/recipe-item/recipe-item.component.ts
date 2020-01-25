import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../../_generated/models/recipe.model';
import {RecipeService} from '../../../_services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor( private recipeService: RecipeService) {

  }

  ngOnInit() {
  }

  loadRecipeDetail(recipe: Recipe) {
    this.recipeService.recipeSelected.emit(recipe);
  }

}
