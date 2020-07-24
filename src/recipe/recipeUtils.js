import slugify from 'slugify';

export const upsert = (db, user) => (values, id) => async () => {
  if (id) {
    // update
    await db.doc(`userGroups/${user.groupId}/recipes/${id}`).update({ ...values, updateDate: new Date() });
  } else {
    // insert
    id = slugify(values.title, { lower: true });
    await db
      .collection(`userGroups/${user.groupId}/recipes`)
      .doc(id)
      .set({ ...values, insertDate: new Date() });
  }
};

export const remove = (db, user) => (id) => async () => {
  await db.doc(`userGroups/${user.groupId}/recipes/${id}`).delete();
};
