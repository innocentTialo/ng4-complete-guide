import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../_services/recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  thereIsRecipes: boolean = false;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    if (this.recipeService.getRecipes().length !== 0) {
      this.thereIsRecipes = true;
    }
  }

}
