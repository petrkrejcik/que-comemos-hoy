import React from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { List, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { db, useColData } from 'storage/firebase';
import { userContext } from 'user/UserProvider';
import { Recipe } from './Recipe';

export const Recipes = () => {
  const [{ user }] = React.useContext(userContext);

  const [recipes, loading] = useColData(
    db.collection(`userGroups/${user.groupId}/recipes`),
    // .orderBy('insertDate')
    { idField: 'id' }
  );

  if (loading) {
    return 'loading';
  }

  return (
    <Switch>
      <Route exact path="/recipes/:recipeId">
        <Recipe />
      </Route>
      <Route exact path="/recipes">
        <List>
          {recipes.map((recipe) => (
            <RecipeItem recipe={recipe} key={recipe.id} />
          ))}
        </List>
      </Route>
      <Redirect to="/recipes" />
    </Switch>
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
