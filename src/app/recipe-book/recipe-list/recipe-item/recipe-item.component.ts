import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../../_generated/models/recipe.model';
import {RecipeService} from '../../../_services/recipe.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipeIndex: number;
  recipe: Recipe;

  constructor( private recipeService: RecipeService, private router: Router) {

  }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipe(this.recipeIndex);
  }

}
