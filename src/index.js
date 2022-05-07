import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const localGraphQL = "http://localhost:4000/";

const client = new ApolloClient({
  uri: localGraphQL,
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query {
        categories {
          name
          products {
            name
            id
            category
            inStock
            description
            brand
            gallery
            attributes {
              name
              id
              type
              items {
                id
                value
                displayValue
              }
            }
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
