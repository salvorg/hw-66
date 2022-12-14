import React from 'react';
import MealItem from "./MealItem";
import {MealMutation} from "../../types";

interface Props {
  meals: MealMutation[];
  deleteMeal: (id: string) => void;
  isDeleting: boolean
}

const Meals: React.FC<Props> = ({meals, deleteMeal, isDeleting}) => {
  return (
    <div>
      {meals.map(meal => (
        <MealItem
          key={meal.id}
          meal={meal}
          onDelete={() => deleteMeal(meal.id)}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};

export default Meals;