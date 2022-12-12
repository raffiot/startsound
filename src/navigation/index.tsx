import React, { useContext } from "react";
import { UserStack } from "./UserStack";
import { AuthStack } from "./AuthStack";
import { UserContext } from "@/context/UserContext";

export default function RootNavigation() {
  const { user, isProfileComplete } = useContext(UserContext);
  return user && isProfileComplete ? <UserStack /> : <AuthStack />;
}
