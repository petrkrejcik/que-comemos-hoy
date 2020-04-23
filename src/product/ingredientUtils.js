import { db, firebase } from 'storage/firebase';

export const updateIngredient = (ingredient, user, data) => {
  if (!ingredient) return;
  const batch = db.batch();
  const ingredientRef = db.doc(`userGroups/${user.groupId}/ingredients/${ingredient.id}`);
  if (data === 'delete') {
    batch.delete(ingredientRef);
  } else {
    batch.update(ingredientRef, data);
  }
  if (ingredient.recipes) {
    Object.keys(ingredient.recipes).forEach((recipeId) => {
      if (data === 'delete') {
        batch.set(
          db.doc(`userGroups/${user.groupId}/recipes/${recipeId}`),
          { ingredients: { [ingredient.id]: firebase.firestore.FieldValue.delete() } },
          { merge: true }
        );
      } else {
        const values = Object.keys(data).reduce((acc, key) => {
          acc[`ingredients.${ingredient.id}.${key}`] = data[key];
          return acc;
        }, {});
        batch.update(db.doc(`userGroups/${user.groupId}/recipes/${recipeId}`), values);
      }
    });
  }
  batch.commit();
};

export const addIngredient = async (title, user) => {
  if (title.trim() === '') return;
  await db.collection('products').add({
    title: title,
    available: false,
    userId: user.id,
    insertDate: new Date(),
  });
};

export const validateIngredient = (ingredient, ingredients) => {
  if (ingredients.find(({ title }) => title === ingredient)) {
    alert('Already exists');
    return false;
  }
  return true;
};
