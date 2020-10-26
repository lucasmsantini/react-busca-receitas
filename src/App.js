import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from './Recipe.js';
import Nav from './Nav';
import About from './About';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


const App = () => {
  const APP_ID = "cb149f48";
  const APP_KEY = "020c2d2d9abc6f1d1ab2a6e6ab60d776";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState ('');
  const [query, setQuery] = useState ('chiken');

  const exemploRequest = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response =  await fetch(exemploRequest);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
    }

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <Router>
      <div className="App">
        <Nav />
          <switch>
            <Route path="/" component={Home}/>
            <Route path="/about" component={About}/>
          </switch>
          <form onSubmit={getSearch} className="search-form">
            <input 
            className="search-bar" 
            type="text" 
            value={search}
            onChange={updateSearch}/>
            <button className="search-btton" type="submit">
              Search
            </button>
          </form>
          
        <div className="recipes">
          {recipes.map(recipe => (
            <Recipe 
            key = {recipe.recipe.label}
            title = {recipe.recipe.label} 
            calories = {recipe.recipe.calories} 
            image = {recipe.recipe.image}
            ingredients = {recipe.recipe.ingredients}/>
          ))}
        </div>
      </div>
      </Router>
  );
};

const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
)

export default App;
