/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import config from "./config"

export const wrapRootElement = ({ element }) => {
    const client = new ApolloClient({
        uri: `${config.wordPressUrl}/graphql`,
    })

    return <ApolloProvider client={client}>{element}</ApolloProvider>
}
