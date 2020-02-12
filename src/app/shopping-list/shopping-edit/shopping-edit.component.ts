import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../_generated/models/ingredient.model';
import {ShoppingListService} from '../../_services/shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('formIngredient', {static: false}) formIngredient: NgForm;

  ingredient: Ingredient = new Ingredient(null, null);
  subscription: Subscription;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService) {
    console.log('in constructor');
  }

  ngOnInit() {
    console.log('in ngONinit');
    this.subscription = this.shoppingListService.ingredientsToProcess.subscribe(
      (ingredientToProcess: Ingredient) => {
        this.ingredient = ingredientToProcess;
        this.formIngredient.setValue({
          name: this.ingredient.name,
          amount: this.ingredient.amount
        });
        this.editMode = true;
      }
    );
  }

  onAddNew() {
    console.log(this.formIngredient.value);
    this.ingredient.name = this.formIngredient.value['name'];
    this.ingredient.amount = this.formIngredient.value['amount'];
    this.shoppingListService.addOrEditIngredient(this.ingredient);
    this.resetForm();
  }

  deleteIngredient() {
    this.shoppingListService.delete(this.ingredient);
    this.resetForm();
  }

  resetForm() {
    this.formIngredient.reset();
    this.ingredient =  new Ingredient(null, null);
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
