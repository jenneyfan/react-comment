import React, {Component} from 'react';
import PropTyps from 'prop-types';
import Comment from './Comment'

class CommentList extends Component {
    static propTypes = {
        comment:PropTyps.array,
        onDeleteComment:PropTyps.func
    };
    static defaultProps = {
        comments:[]
    };
    handleDeleteComment(index){
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(index);
        }
    }

    render() {
        let list = this.props.comments.map(
            (comment,id) =>
            <Comment
                comment={comment}
                key={id}
                index={id}
                onDeleteComment={(e)=>this.handleDeleteComment(e)}
            />
        )
        return (
            <div>{list}</div>
        )
    }
}

export default CommentList