import React, { useContext } from "react"
import CommentContext from "../hooks/commentContext"
import CommentForm from "./commentForm"

const Comment = ({
    comment: { commentId, content, date, author },
    isChild,
}) => {

    const commentData = useContext(CommentContext)

    return (
        <div id={commentId} className="comment">
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <p className="meta">
                From {author.name} on {date}
            </p>
            {!isChild && (
                <>
                    {commentData.commentId === commentId ? (
                        <CommentForm />
                    ) : (
                            <p>
                                <button
                                    onClick={event => {
                                        event.preventDefault()
                                        commentData.updateCommentId(commentId)
                                    }}
                                >
                                    Reply
                                </button>
                            </p>
                    )}
                </>
            )}
        </div>
    )
}

const Comments = ({ post }) => {
    const comments = post.comments.nodes
    let header = `No Comments Yet!`
    if (comments.length === 1) {
        header = `Comment`
    } else if (comments.length > 1) {
        header = `Comments`
    }
    return (
        <section className="comments">
            <h2>{header}</h2>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </section>
    )
}

export default Comments
