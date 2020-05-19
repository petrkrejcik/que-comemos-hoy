import * as firebase from 'firebase/app';
import { config } from 'config';

export const init = () => {
  console.log('🛎 ', 'initttiiiing');
  const env = process.env.REACT_APP_ENV || 'production';
  firebase.initializeApp(config.firebase[env]);
  firebase.firestore().settings({ experimentalForceLongPolling: true });

  const db = firebase.firestore();

  db.enablePersistence().catch(function (err) {
    if (err.code === 'failed-precondition') {
      console.log("More tabs opened. Offline support won't work.");
    } else if (err.code === 'unimplemented') {
      console.log('Offline mode not supported.');
    }
  });

  return { db, firebase };
};
