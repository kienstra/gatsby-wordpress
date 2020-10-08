import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from "../components/pagination"
import ArchivePosts from "../components/ArchivePosts";

const Posts = props => {
  const {
    data: {
      wpgraphql: { posts },
    },
    pageContext: { pageNumber, hasNextPage }
  } = props

  const currentPage = pageNumber ? `- Page ${pageNumber}` : ``

  return (
    <Layout>
      <SEO title={`Blog Archive`} />
      <h1>Blog Archive {currentPage}</h1>
      <ArchivePosts posts={posts} />
      <Pagination pageNumber={pageNumber} hasNextPage={hasNextPage} />
    </Layout>
  )
}

export default Posts

export const pageQuery = graphql`
  query GET_POSTS($ids: [ID]) {
    wpgraphql {
      posts(where: { in: $ids }) {
        nodes {
          id
          title
          slug
          uri
        }
      }
    }
  }
`
