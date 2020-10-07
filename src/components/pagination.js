import React from "react"
import { Link } from "gatsby"

const Pagination = ({ pageNumber, hasNextPage }) => {
    let previousLink = null;
    if ( 1 === pageNumber ) {
        previousLink = `/blog`
    } else if ( 1 < pageNumber ) {
        previousLink = `/blog/page/${pageNumber - 1}`
    }

    const nextLink = hasNextPage ? `/blog/page/${pageNumber + 1}` : null;

    return (
        <nav>
            <ul>
                { previousLink && <li><Link to={previousLink}>&lt; Previous Posts</Link></li> }
                { nextLink && <li><Link to={nextLink}>Next Posts &gt;</Link></li> }
            </ul>
        </nav>
    )
}

export default Pagination
