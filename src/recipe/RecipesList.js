import React from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { List, Card, CardContent, Typography, IconButton, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useColData, useFirestore } from 'storage/firebase';
import { useUser } from 'user/userUtils';
import { Recipe } from './Recipe';
import { RecipesProvider } from 'recipe/RecipesProvider';
import { useRecipes } from 'recipe/recipesHooks';
import { Add } from '@material-ui/icons';

export const RecipesList = () => {
  const [recipes, loading] = useRecipes();
  const history = useHistory();

  if (loading) {
    return 'loading';
  }

  return (
    <List>
      {recipes.map((recipe) => (
        <RecipeItem recipe={recipe} key={recipe.id} />
      ))}
      <Paper onClick={() => history.push(`/recipes/new`)}>
        <Box p={2}>
          <IconButton aria-label="add recipe">
            <Add />
          </IconButton>
        </Box>
      </Paper>
    </List>
  );
};

const recipeItemStyle = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const RecipeItem = ({ recipe }) => {
  const classes = recipeItemStyle();
  const history = useHistory();

  const handleRecipeClick = (id) => () => {
    history.push(`/recipes/${id}`, { recipe });
  };
  return (
    <Card className={classes.root} onClick={handleRecipeClick(recipe.id)}>
      {/* <CardMedia title={recipe.title} /> */}
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {recipe.title}
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          {recipe.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
