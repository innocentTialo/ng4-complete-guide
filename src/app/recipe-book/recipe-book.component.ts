import { Component, OnInit } from '@angular/core';
import {Recipe} from '../_generated/models/recipe.model';
import {RecipeService} from '../_services/recipe.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {
  recipeToDisplayDetails: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipeSelected
      .subscribe(
        (recipe: Recipe) => {
          this.recipeToDisplayDetails = recipe;
        }
      )
  }
}
