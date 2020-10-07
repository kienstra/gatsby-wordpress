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
                title
            }
          }
        }
      }
    `

    const { createPage } = actions
    const allPosts = []
    const blogPages = []
    let pageNumber = 0

    const fetchPosts = async variables =>
        await graphql(GET_POSTS, variables).then(({ data }) => {
            const {
                wpgraphql: {
                    posts: {
                        nodes,
                        pageInfo: { hasNextPage, endCursor },
                    },
                },
            } = data

            const nodeIds = nodes.map(node => node.postId)
            const postsTemplate = path.resolve(`./src/templates/posts.js`)
            const postsPath = !variables.after ? `/blog` : `/blog/page/${pageNumber}`

            blogPages[pageNumber] = {
              path: postsPath,
              component: postsTemplate,
              context: {
                ids: nodeIds,
                pageNumber,
                hasNextPage,
              },
              ids: nodeIds,
            }

            nodes.map(post => {
                allPosts.push(post)
            })
            if (hasNextPage) {
                pageNumber++
                return fetchPosts({ first: 12, after: endCursor })
            }
            return allPosts
        })

    // Map over all the pages and call createPage
    await fetchPosts({ first: 12, after: null }).then(allPosts => {
        const postTemplate = path.resolve(`./src/templates/post.js`)

        blogPages.map( blogPage => {
          console.log(`create post archive: ${blogPage.path}`)
          createPage(blogPage)
        })

        allPosts.map(post => {
            if (post.isFrontPage === true) post.uri = ``
            console.log(`create post: ${post.uri}`)
            createPage({
                path: `/blog/${post.uri}`,
                component: postTemplate,
                context: post,
            })
        })
    })
}
