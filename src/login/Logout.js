import { firebase } from "storage/firebase";

export const useLogout = () => {
  const logout = () => {
    try {
      firebase.auth().signOut();
    } catch (error) {
      console.log("🛎 ", "erroror signing out");
    }
  };
  return logout;
};
