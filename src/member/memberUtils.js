import firebase from 'firebase/app';
// import { useFirestore } from 'storage/firebase';

export const update = (db, shop, user, data) => {
  const values = Object.keys(data).reduce((acc, key) => {
    acc[`shops.${shop.id}.${key}`] = data[key];
    return acc;
  }, {});
  return db.doc(`userGroups/${user.groupId}`).update(values);
};

export const add = async (db, user, email) => {
  if (email.trim() === '') return;
  const doc = await db.collection(`users`).where('email', '==', email).limit(1).get();
  if (doc.empty) {
    alert('Email not found');
    return;
  }
  const member = {
    ...doc.docs[0].data(),
    id: doc.docs[0].id,
  };
  return db.doc(`users/${member.id}`).update({
    groupId: user.groupId,
  });
};

export const remove = (db, shop, user) => {
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
