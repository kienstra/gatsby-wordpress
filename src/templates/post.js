import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = props => {
    const {
        data: {
            wpgraphql: { post },
        },
    } = props
    const { title, content, author, categories, tags } = post
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
        </Layout>
    )
}

            export default Post

            export const pageQuery = graphql`
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
                    }
                }
            }
            `
