// import { useFirestore } from 'storage/firebase';

// export const getRecipeById = async (db, id, onChange) => {

//   const doc = await db.collection('recipes').doc(id).get();
//   if (!doc.exists) {
//     throw new Error('Recipe not found');
//   }
//   doc.onSnapshot((snapshot) => {
//     const recipe = {
//       id: snapshot.id,
//       ...snapshot.data(),
//     };
//     onChange(recipe);
//   });
// };
