import * as firebase from 'firebase/app';
import '@firebase/testing';

export const init = () => {
  firebase.initializeTestApp({
    projectId: 'someprojectid',
    auth: { uid: 'foo', email: 'foo@bar.com' },
  });
  return firebase.firestore();
};
