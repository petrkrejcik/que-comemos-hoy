import * as firebase from '@firebase/testing';

export const init = (user) => {
  const db = firebase
    .initializeTestApp({
      projectId: 'que-comemos-develop',
      auth: user,
    })
    .firestore();

  return {
    db,
    // firebase: {
    //   ...firebase,
    //   auth: () => ({
    //     onAuthStateChanged: (cb) => {
    //       setTimeout(() => {
    //         cb(mockUser);
    //       }, 1);
    //     },
    //   }),
    // },
  };
};

// export const db = init().db;
