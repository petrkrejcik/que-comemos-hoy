import slugify from 'slugify';
import firebase from 'firebase/app';

export const updateShop = (db, shop, user, data) => {
  const values = Object.keys(data).reduce((acc, key) => {
    acc[`shops.${shop.id}.${key}`] = data[key];
    return acc;
  }, {});
  return db.doc(`userGroups/${user.groupId}`).update(values);
};

export const addShop = (db, user, title) => {
  if (title.trim() === '') return;
  const shopId = slugify(title, { lower: true });
  return db.doc(`userGroups/${user.groupId}`).update({
    [`shops.${shopId}`]: {
      title: title,
      created: new Date(),
    },
  });
};

export const removeShop = (db, shop, user) => {
  return db.doc(`userGroups/${user.groupId}`).set(
    {
      shops: { [shop.id]: firebase.firestore.FieldValue.delete() },
    },
    { merge: true }
  );
};

export const validateIngredient = (ingredient, ingredients) => {
  if (ingredients.find(({ title }) => title === ingredient)) {
    alert('Already exists');
    return false;
  }
  return true;
};
