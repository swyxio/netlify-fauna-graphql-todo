import React, { StrictMode } from "react"
import ReactDOM from "react-dom"
import "todomvc-common/base.css"
import "todomvc-app-css/index.css"
import App from "./App"
import AppHeader from "./components/AppHeader"

import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo-hooks"
const client = new ApolloClient({
  uri: "/.netlify/functions/fauna-graphql"
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <StrictMode>
      <AppHeader />
      <App />
    </StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
)
