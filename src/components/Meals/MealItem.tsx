import React from 'react';
import {Link} from "react-router-dom";
import {MealMutation} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  meal: MealMutation;
  onDelete: React.MouseEventHandler;
  isDeleting: boolean
}

const MealItem: React.FC<Props> = ({meal, onDelete, isDeleting}) => {

  return (
    <div className='d-flex justify-content-between border border-dark rounded align-items-center p-2 mb-3'>
      <div className='d-flex flex-column fs-5'>
        <span className='text-black-50'>{meal.meals}</span>
        <span>{meal.dish}</span>
      </div>
      <div className='d-flex align-items-center'>
        <span className='fs-5'><strong>{meal.calories} kcal</strong></span>
        <div className="d-flex flex-column ms-5">
          <Link to={'/meals/edit/' + meal.id} className='btn btn-primary mb-1 p-1'>Edit</Link>
          <button
            className='btn btn-danger p-1'
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting && <ButtonSpinner/>}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;