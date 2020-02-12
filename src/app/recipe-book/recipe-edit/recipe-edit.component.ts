import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../_services/recipe.service';
import {Recipe} from '../../_generated/models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;
  imagePath = '';

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService) { }

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
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.id);
      this.imagePath = this.recipe.imagePath;
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      if (this.recipe.ingredients != null){
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
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onSubmit() {

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
}
