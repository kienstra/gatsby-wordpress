const path = require(`path`)

module.exports = async ({ actions, graphql }) => {
    const GET_POSTS = `
      query GET_POSTS($first:Int $after:String) {
        wpgraphql {
          posts(
            first: $first
            after: $after
          ) {
            pageInfo {
                endCursor
                hasNextPage
            }
            nodes {
                id
                uri
                postId
                slug
                title
            }
          }
        }
      }
    `

    const { createPage } = actions
    const allPosts = []
    // Create a function for getting pages
    const fetchPages = async variables =>
        await graphql(GET_POSTS, variables).then(({ data }) => {
            const {
                wpgraphql: {
                    posts: {
                        nodes,
                        pageInfo: { hasNextPage, endCursor },
                    },
                },
            } = data
            nodes.map(post => {
                allPosts.push(post)
            })
            if (hasNextPage) {
                return fetchPages({ first: variables.first, after: endCursor })
            }
            return allPosts
        })

    // Map over all the pages and call createPage
    await fetchPages({ first: 100, after: null }).then(allPosts => {
        const postTemplate = path.resolve(`./src/templates/post.js`)

        allPosts.map(post => {
            if (post.isFrontPage === true) post.slug = ``
            console.log(`create post: ${post.slug}`)
            createPage({
                path: `/blog/${post.slug}`,
                component: postTemplate,
                context: post,
            })
        })
    })
}
