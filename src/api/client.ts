import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhoost:3001", // TODO: move to env var
  cache: new InMemoryCache(),
});
