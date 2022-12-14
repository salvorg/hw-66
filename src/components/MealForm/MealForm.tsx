import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {Meal} from "../../types";
import Spinner from "../Spinner/Spinner";
import ButtonSpinner from "../Spinner/ButtonSpinner";

const MealForm = () => {
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mealSelected, setMealSelected] = useState('');
  const [mealInfo, setMealInfo] = useState<Meal>({
    meals: '',
    dish: '',
    calories: 0,
  });

  let title = 'Add meal';

  if (location.pathname === '/meals/edit/' + id) {
    title = 'Edit meal';
  }

  const fetchEdited = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axiosApi.get<Meal>('/meals/' + id + '.json');
      setMealInfo(response.data);
      setMealSelected(response.data.meals);
    } finally {
      setLoading(false);
    }
    }, [id]);

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMealSelected(value);
  };

  const onMealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setMealInfo(prev => ({...prev, [name]: value, meals: mealSelected}));
  }

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (location.pathname === '/meals/new') {
        if (mealSelected.length > 0) {
          await axiosApi.post<Meal>('/meals.json', mealInfo);
          navigate('/');
        }
      } else {
        await axiosApi.put('/meals/' + id + '.json', mealInfo);
      }
      } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (id) {
      void fetchEdited();
    }
  }, [fetchEdited, id]);

  let form = (
    <form className='container-fluid' onSubmit={onFormSubmit}>
      <p>{title}</p>
      <div className="form-group">
        <select
          name="meals" id="meals"
          className='form-select mb-4'
          value={mealSelected}
          onChange={changeValue}
        >
          <option disabled value="">Choose meal</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Snack">Snack</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>
      <div className="form-group">
        <input
          type="text" name='dish'
          className='form-control mb-4'
          placeholder='Meal description'
          value={mealInfo.dish}
          onChange={onMealChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number" name='calories' id='calories'
          className='form-control'
          placeholder='Calories'
          value={mealInfo.calories}
          onChange={onMealChange}
        />
      </div>
      <button
        type='submit'
        className='btn btn-primary mt-4'
        disabled={saving}
      >{saving && <ButtonSpinner/>}Save</button>
    </form>
  )

  return (
    <>
      {loading ? <Spinner/> : form}
    </>
  );
};

export default MealForm;