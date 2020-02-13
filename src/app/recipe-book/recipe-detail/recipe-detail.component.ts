import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../_generated/models/recipe.model';
import {RecipeService} from '../../_services/recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Ingredient} from '../../_generated/models/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      )
  }

  addRecipeToShoppingList() {
    this.recipeService.addIngredientToAShoppingList(this.recipe.ingredients as Ingredient[]);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
