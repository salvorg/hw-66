export interface Meal {
  meals: string;
  dish: string;
  calories: number;
}

export interface MealMutation extends Meal {
  id: string;
}

export interface ApiMealsList {
  [id: string]: Meal;
}