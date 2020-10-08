import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Comments from "../components/comments"
import CommentForm from "../components/commentForm"
import { CommentProvider } from "../hooks/commentContext"

const Post = props => {
    const {
        data: {
            wpgraphql: { post },
        },
    } = props
    const { title, content, postId, author, categories, tags } = post

    const [commentId, setCommentId] = useState(null)
    const commentData = {
        postId: postId,
        commentId: commentId,
        updateCommentId: id => {
            setCommentId(id)
        },
    }

    return (
        <Layout>
            <SEO title={title} />
            <ul className="meta">
                <li>Author: <Link to={`/user/${author.node.slug}`}>{author.node.name}</Link></li>
                { !! categories.nodes.length && (
                    <>
                        { ` | ` }
                        <li>
                            Category:
                            <ul>
                            { categories.nodes.map(category => (
                                <li key={category.id}><Link to={`/blog/category/${category.slug}`}>{category.name}</Link></li>
                            ))}
                            </ul>
                        </li>
                    </>
                )}
                { !! tags.nodes.length && (
                    <>
                        {` | `}
                        <li>
                        Tags:
                            <ul>
                                {tags.nodes.map(tag => (
                                    <li key={tag.id}><Link to={`/blog/tag/${tag.slug}`}>{tag.name}</Link></li>
                                ))}
                            </ul>
                        </li>
                    </>
                )}
            </ul>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
            <CommentProvider value={commentData}>
                <Comments post={post} />
                {!commentData.commentId && <CommentForm />}
            </CommentProvider>
        </Layout>
    )
}

export default Post

export const pageQuery = graphql`
  fragment CommentFields on WPGraphql_Comment {
    date
    id
    author {
        node {
            ... on WPGraphql_CommentAuthor {
                id
                email
                name
                url
            }
        }
    }
    commentId
    content(format: RENDERED)
  }

  query GET_POST($id: ID!) {
    wpgraphql {
        post(id: $id) {
            title
            content
            uri
            author {
                node {
                    name
                    slug
                }
            }
            categories {
                nodes {
                    slug
                    name
                }
            }
            tags {
                nodes {
                    slug
                    name
                }
            }
            comments {
                nodes {
                    ...CommentFields
                }
            }
        }
    }
}
`
