import React from "react";
import { ApolloProvider } from "@apollo/client";
import { generateApolloClient } from "./generateApolloClient";

type Props = {
  children: React.ReactNode;
};

export const CustomApolloProvider = ({ children }: Props) => {
  return (
    <ApolloProvider client={generateApolloClient()}>{children}</ApolloProvider>
  );
};
