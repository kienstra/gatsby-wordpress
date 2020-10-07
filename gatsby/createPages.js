const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
  const GET_PAGES = `
    query GET_PAGES($first:Int $after:String) {
      wpgraphql {
        pages(
          first: $first
          after: $after
          where: {
            parent: null
          }
        ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            uri
            pageId
            slug
            title
          }
        }
      }
    }
  `

    const { createPage } = actions
    const allPages = []
    // Create a function for getting pages
    const fetchPages = async variables =>
        await graphql(GET_PAGES, variables).then(({ data }) => {
            const {
                wpgraphql: {
                    pages: {
                        nodes,
                        pageInfo: { hasNextPage, endCursor },
                    },
                },
            } = data
            nodes.map(page => {
                allPages.push(page)
            })
            if (hasNextPage) {
                return fetchPages({ first: variables.first, after: endCursor })
            }
            return allPages
        })

    // Map over all the pages and call createPage
    await fetchPages({ first: 100, after: null }).then(allPages => {
        const pageTemplate = path.resolve(`./src/templates/page.js`)

        allPages.map(page => {
            if (page.isFrontPage === true) page.slug = ``
            console.log(`create page: ${page.slug}`)
            createPage({
                path: page.slug,
                component: pageTemplate,
                context: page,
            })
        })
    })
}
