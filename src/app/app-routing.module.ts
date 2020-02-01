import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RecipeBookComponent} from './recipe-book/recipe-book.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RecipeStartComponent} from './recipe-book/recipe-start/recipe-start.component';
import {RecipeDetailComponent} from './recipe-book/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipe-book/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipeBookComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent},
    ]
  },
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
