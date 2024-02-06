export interface Measurement {
  metric: {
    amount: number;
    unitShort: string;
    unitLong: string;
  };
}

export interface ExtendedIngredient {
  name: string;
  measures: Measurement;
}

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
  extendedIngredients!: ExtendedIngredient[];
  instructions!: string;
  description!: string;
  isFavorite!: boolean;
  servings!: number;
  summary!: string;
  preparationMinutes!: number;
  name!: string;
}
