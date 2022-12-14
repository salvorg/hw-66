import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Meals from "../../components/Meals/Meals";
import axiosApi from "../../axiosApi";
import {ApiMealsList, MealMutation} from "../../types";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [meals, setMeals] = useState<MealMutation[]>([]);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axiosApi.get<ApiMealsList | null>('/meals.json');
      const meals = response.data;

      if (!meals) {
        return setMeals([]);
      }

      const newMeals = Object.keys(meals).map(id => {
        const meal = meals[id];

        return {
          ...meal,
          id,
        };
      }).reverse();

      const totalPrice = newMeals.reduce(
        (acc, value) => {
          return acc + Number(value.calories);
        }, 0);

      setTotal(totalPrice);
      setMeals(newMeals);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMeal = async (id: string) => {
    try {
      setDeleting(true);

      await axiosApi.delete('/meals/' + id + '.json');
      await fetchMeals();
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);

  return (
    <div>
      <div className='d-flex align-items-center mb-4'>
        <p className='fs-4 m-0'>Total Calories: <strong>{total} kcal</strong></p>
        <Link to='/meals/new' className='btn btn-success ms-5'>Add new meal</Link>
      </div>
      <div>
        {loading ? <Spinner/> : (
          <Meals meals={meals} deleteMeal={deleteMeal} isDeleting={deleting}/>
        )}
      </div>
    </div>

  );
};

export default Home;