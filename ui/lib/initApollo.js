import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-unfetch";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const API_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/graphql"
    : "https://pairhub.io/graphql";

function create(initialState, { getToken }) {
  const httpLink = createHttpLink({
    uri: API_URI,
    credentials: "same-origin"
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        cookie: token ? token : ""
      }
    };
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
