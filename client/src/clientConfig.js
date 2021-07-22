import { ApolloClient, createHttpLink } from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/core";
import { LocalStorageWrapper, persistCache } from "apollo3-cache-persist";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors);
  }
  if (networkError) {
    console.log(networkError);
  }
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwtToken");

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const link = ApolloLink.from([authLink, errorLink, httpLink]);

let cache = new InMemoryCache();
const cachePersister = async () => {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(localStorage),
  });
};
cachePersister();

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
