const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
    // Setup our query
    const GET_CATEGORIES = `
        query GET_CATEGORIES($first:Int) {
            wpgraphql {
                categories(first: $first) {
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                    nodes {
                        id
                        categoryId
                        slug
                    }
                }
            }
        }
    `

    const { createPage } = actions
    const allTags = []

    const fetchCategories = async variables =>
        await graphql(GET_CATEGORIES, variables).then(({ data }) => {
            const {
                wpgraphql: {
                    categories: {
                        nodes,
                        pageInfo: { hasNextPage, endCursor },
                    },
                },
            } = data
            nodes.map(category => {
                allTags.push(category)
            })
            if (hasNextPage) {
                return fetchCategories({ first: variables.first, after: endCursor })
            }
            return allTags
        })

    await fetchCategories({ first: 100, after: null }).then(allCategories => {
        const tagTemplate = path.resolve(`./src/templates/category.js`)

        allCategories.map(category => {
            console.log(`create category: ${category.slug}`)
            createPage({
                path: `/blog/category/${category.slug}`,
                component: tagTemplate,
                context: category,
            })
        })
    })
}
