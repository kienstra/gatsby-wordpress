import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { createLocalLink } from "../utils"

const MAIN_MENU_QUERY = graphql`
    fragment MenuFields on WPGraphql_MenuItem {
        id
        label
        url
    }

    query GET_MENU_ITEMS {
        wpgraphql {
            menuItems(where: { location: PRIMARY}) {
                nodes {
                    ...MenuFields
                    childItems {
                        nodes {
                            ...MenuFields
                        }
                    }
                }
            }
        }
    }
`

const renderMenuItem = item => {
    const hasChild = item.childItems && item.childItems.nodes.length

    return (
        <li key={item.id}>
            <Link to={createLocalLink(item.url)}>{item.label}</Link>
            {!! hasChild && renderChildMenu(item)}
        </li>
    )
}

const renderChildMenu = item => {
    return <ul>{item.childItems.nodes.map(child => renderMenuItem(child))}</ul>
}

const MainMenu = props => {
    return (
        <StaticQuery
            query={MAIN_MENU_QUERY}
            render={({
                wpgraphql: {
                    menuItems: { nodes: menu }
                },
            }) => {
                return (
                    <nav>
                        <ul>
                            {menu.map(item => renderMenuItem(item))}
                        </ul>
                    </nav>
                )
            }}
        />
    )
}

export default MainMenu
