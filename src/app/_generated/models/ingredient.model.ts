export class Ingredient {
  constructor(public name: string, public amount: number) {}

  equals(ingredient: Ingredient) {
    return this.name.toLocaleLowerCase() === ingredient.name.toLocaleLowerCase() || this === ingredient;
  }
}
