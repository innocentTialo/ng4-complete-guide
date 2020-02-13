import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../_services/recipe.service';
import {Recipe} from '../../_generated/models/recipe.model';
import {Ingredient} from '../../_generated/models/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private recipe: Recipe;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  private initForm() {
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.id);
      if (this.recipe.ingredients != null) {
        this.recipe.ingredients.forEach(ingredient => {
          recipeIngredients.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }
          ));
        });
      }
    } else {
      this.recipe = new Recipe(null, null, null, null);
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(this.recipe.name, Validators.required),
      'imagePath': new FormControl(this.recipe.imagePath, Validators.required),
      'description': new FormControl(this.recipe.description, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value as Recipe);
      this.onCancel();
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.initForm();
  }

  onAddIngredient() {
    const ingredientGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });

    this.ingredients.push(ingredientGroup);
  }

  onDeleteIngredientControl(index: number) {
    this.ingredients.removeAt(index);
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }
}
