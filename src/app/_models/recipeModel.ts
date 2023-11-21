export class RecipeModel {
  id!: number;
  title!: string;
  image!: string;
  readyInMinutes!: number;
  healthScore!: number;
  dishTypes!: string[];
  vegan!: boolean;
  vegetarian!: boolean;
  veryPopular!: boolean;
  extendedIngredients!: string[];
}
