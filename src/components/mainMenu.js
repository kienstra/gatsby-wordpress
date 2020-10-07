import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

const MAIN_MENU_QUERY = graphql`
    query GET_MENU_ITEMS {
        wpgraphql {
            menuItems(where: { location: PRIMARY}) {
                nodes {
                    id
                    label
                    url
                }
            }
        }
    }
`

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
                            {menu.map(item => (
                                <li key={item.id}>
                                    <Link to={item.url}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )
            }}
        />
    )
}

export default MainMenu
