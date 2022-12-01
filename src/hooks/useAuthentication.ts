import React, { useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import app from "../config/firebase";

const auth = getAuth(app);

export function useAuthentication() {
  const [user, setUser] = useState<User>();

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
  };
}
