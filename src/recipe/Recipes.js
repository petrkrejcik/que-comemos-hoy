import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import {
  Button,
  Checkbox,
  TextField,
  List,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { db } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';
import { Recipe } from './Recipe';

export const Recipes = () => {
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  const [recipes, setRecipes] = useState([]);
  // const [newProduct, setNewProduct] = useState('');

  useAsync(async () => {
    if (!user) return;
    const query = db.collection('recipes').where('userId', '==', user.id).limit(50);

    query.onSnapshot((snapshot) => {
      const loadedRecipes = snapshot.docs.map((recipe) => {
        return {
          id: recipe.id,
          ...recipe.data(),
        };
      });
      setRecipes(loadedRecipes);
      // snapshot.forEach((doc) => {
      //   console.log("🛎 ", "doc", doc.data());
      // });
    });
  }, [user]);

  // const add = async () => {
  //   await db.collection('recipes').add({
  //     name: newProduct,
  //     available: false,
  //     userId: user.id,
  //   });
  //   setNewProduct('');
  // };

  // const update = (id) => async () => {
  //   await db.collection('recipes').doc(id).update({
  //     available: true,
  //   });
  // };

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
