import React from 'react';
import produce from 'immer';
// import { useAsyncFn } from 'react-use';
// import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
// import { useFirestore } from 'storage/firebase';
import { productContext } from 'product/ProductProvider';
// import { useUser } from 'user/userUtils';

// export const useUpdateIngredient = async (product) => {
//   const db = useFirestore();
//   const user = useUser();
//   const history = useHistory();

//   // if (ingredient.recipes) {
//   //   Object.keys(ingredient.recipes).forEach((recipeId) => {
//   //     if (data === 'delete') {
//   //       batch.set(
//   //         db.doc(`userGroups/${user.groupId}/recipes/${recipeId}`),
//   //         { ingredients: { [ingredient.id]: firebase.firestore.FieldValue.delete() } },
//   //         { merge: true }
//   //       );
//   //     } else {
//   //       const values = Object.keys(data).reduce((acc, key) => {
//   //         acc[`ingredients.${ingredient.id}.${key}`] = data[key];
//   //         return acc;
//   //       }, {});
//   //       batch.update(db.doc(`userGroups/${user.groupId}/recipes/${recipeId}`), values);
//   //     }
//   //   });
//   // }
//   return useAsyncFn(async () => {
//     if (!product) return;
//     const { id, insertDate, ...updated } = product;
//     const batch = db.batch();
//     const ingredientRef = db.doc(`userGroups/${user.groupId}/ingredients/${product.id}`);
//     if (product === 'delete') {
//       batch.delete(ingredientRef);
//     } else {
//       batch.update(ingredientRef, updated);
//     }
//     await batch.commit();
//     history.goBack();
//   }, [product, user, history]);
// };

export const updateIngredient = async (db, ingredient, user, data) => {
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
  await batch.commit();
};

export const addIngredient = async (db, title, user) => {
  if (title.trim() === '') return;
  await db.collection(`userGroups/${user.groupId}/ingredients`).add({
    title: title,
    lists: { [LISTS.shopping]: true },
    availability: {},
    insertDate: new Date(),
  });
};

export const removeProduct = async (db, productId, user) => {
  return db.doc(`userGroups/${user.groupId}/ingredients/${productId}`).delete();
};

export const validateIngredient = (ingredient, ingredients) => {
  if (ingredients.find(({ title }) => title === ingredient)) {
    alert('Already exists');
    return false;
  }
  return true;
};

export const FROZEN_STATES = {
  no: false,
  yes: true,
  both: 'both',
};

export const LISTS = {
  shopping: 'shopping',
};

export const AVAILABILITY = {
  default: 'default',
  frozen: 'frozen',
};

export const isOnShoppingList = (isPresent) => (product) =>
  isPresent ? !!product.lists[LISTS.shopping] : !product.lists[LISTS.shopping];

export const isFrozen = (product) => !!product.availability[AVAILABILITY.frozen];
export const isAvailable = (product) => !!product.availability[AVAILABILITY.default];

export const toggleIsOnShoppingList = (product) => {
  // const copyProduct = { ...product };
  // if (isOnShoppingList(true)(copyProduct)) {
  //   delete copyProduct.lists[LISTS.shopping];
  // } else {
  //   copyProduct.lists[LISTS.shopping] = true;
  // }
  // return copyProduct;
  return produce(product, (draft) => {
    draft.lists.shopping = !product.lists.shopping;
  });
};

export const toggleIsFrozen = (product) => {
  return produce(product, (draft) => {
    draft.availability.frozen = !product.availability.frozen;
  });
};

export const setAvailability = (product, value) => {
  const copyProduct = { ...product };
  if (value === FROZEN_STATES.no) {
    copyProduct.availability = {};
  } else if (value === FROZEN_STATES.yes) {
    copyProduct.availability = { [AVAILABILITY.frozen]: true };
  } else {
    copyProduct.availability = { [AVAILABILITY.default]: true, [AVAILABILITY.frozen]: true };
  }
  return copyProduct;
};

export const useProducts = () => {
  const { products } = React.useContext(productContext);
  return products;
};

export const SECTIONS = {
  shoppingList: 'shopping-list',
  frozen: 'frozen',
};
