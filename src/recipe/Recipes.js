import React from 'react';
import { Container } from '@material-ui/core';
import { Switch, Route, useHistory, Redirect, useParams } from 'react-router-dom';
import { Shell } from 'app/Shell';
import { Swipeable } from 'app/Swipeable';
import { ProductProvider } from 'product/ProductProvider';
import { RecipeDetail } from 'recipe/recipeDetail';
import { RecipesList } from 'recipe/RecipesList';
import { RecipesProvider } from 'recipe/RecipesProvider';

const PAGES = {
  list: 0,
  detail: 1,
};

export const Recipes = () => {
  const { recipeId } = useParams();

  const getIndex = () => {
    if (recipeId) return PAGES.detail;
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
              <RecipeDetail active={getIndex() === PAGES.detail} />
            </Container>
          </Swipeable>
        </RecipesProvider>
      </ProductProvider>
    </Shell>
  );
};
