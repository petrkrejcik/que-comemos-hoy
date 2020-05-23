import * as firebase from '@firebase/testing';

export const init = () => {
  const user = { uid: 'foo', email: 'foo@bar.com' };
  const db = firebase
    .initializeTestApp({
      projectId: 'que-comemos-develop',
      auth: user,
    })
    .firestore();
  return {
    db,
    firebase: {
      ...firebase,
      auth: () => ({
        onAuthStateChanged: (cb) => {
          setTimeout(() => {
            cb(user);
          }, 1);
        },
      }),
    },
  };
};
