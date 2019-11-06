import React, {Component} from 'react'
import Comment from './Comment'

class CommentList extends Component {
    static defaultProps = {
        comments:[]
    };
    render() {
        let list = this.props.comments.map((comment,id)=><Comment comment={comment} key={id}/>)
        return (
            <div>{list}</div>
        )
    }
}

export default CommentList