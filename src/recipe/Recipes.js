import React from 'react';
import { Switch, Route, useHistory, Redirect, useParams } from 'react-router-dom';
import { Recipe } from './Recipe';
import { RecipesProvider } from 'recipe/RecipesProvider';
import { RecipesList } from 'recipe/RecipesList';
import { AddEditRecipe } from 'recipe/AddEditRecipe';
import { Swipeable } from 'app/Swipeable';
import { Container } from '@material-ui/core';
import { ProductProvider } from 'product/ProductProvider';
import { Shell } from 'app/Shell';

const PAGES = {
  list: 0,
  recipe: 1,
  addEdit: 2,
};

export const Recipes = () => {
  const { recipeId } = useParams();

  const getIndex = () => {
    if (recipeId === 'new') return PAGES.addEdit;
    if (recipeId) return PAGES.recipe;
    return PAGES.list;
  };

  return (
    <Shell>
      <ProductProvider>
        <RecipesProvider>
          <Swipeable index={getIndex()}>
            <Container>
              <RecipesList active={getIndex() === PAGES.list} />
            </Container>
            <Container>
              <Recipe active={getIndex() === PAGES.recipe} />
            </Container>
            <Container>
              <AddEditRecipe active={getIndex() === PAGES.addEdit} />
            </Container>
          </Swipeable>
        </RecipesProvider>
      </ProductProvider>
    </Shell>
  );
};
