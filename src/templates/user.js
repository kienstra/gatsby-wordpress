import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ArchivePosts from "../components/ArchivePosts"
import SEO from "../components/seo"

const UserTemplate = props => {
  const {
    data: {
      wpgraphql: { user },
    },
  } = props
  const { name, description, posts } = user
  return (
    <Layout>
      <SEO title={name} />
      <h1>User: {name}</h1>
      <p>{description}</p>
      <ArchivePosts posts={posts} />
    </Layout>
  )
}

export default UserTemplate

export const userQuery = graphql`
  query GET_USER($id: ID!) {
    wpgraphql {
      user(id: $id) {
        id
        name
        description
        posts {
          nodes {
            postId
            title(format: RENDERED)
            slug
            uri
          }
        }
      }
    }
  }
`
