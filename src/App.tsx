import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import MealForm from "./components/MealForm/MealForm";

function App() {
  return (
    <div>
      <header className='mb-3'>
        <h2 className='mt-4 pb-4 ps-3 border-bottom'>
          <Link to={'/'} className='text-body'>
            Calorie tracker
          </Link>
        </h2>
      </header>
      <main className='container-fluid'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/meals/new' element={<MealForm/>}/>
          <Route path='/meals/edit/:id' element={<MealForm/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
