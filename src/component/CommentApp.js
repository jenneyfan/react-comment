import React,{Component} from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import WrapWithLoadData from './WrapWithLoadData';

class CommentApp extends Component{
    constructor(props) {
        super(props);
        this.state = { comments: props.data }
    }
    handleSubmitComment (comment) {
        if (!comment) return;
        if (!comment.username) return alert('请输入用户名');
        if (!comment.content) return alert('请输入评论内容');
        const comments = this.state.comments;
        comments.push(comment);
        this.setState({ comments });
        this.props.saveData(comments);
    }

    handleDeleteComment (index) {
        const comments = this.state.comments;
        comments.splice(index, 1);
        this.setState({ comments });
        this.props.saveData(comments)
    }

    render() {
        return (
            <div className='wrapper'>
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList
                    comments={this.state.comments}
                    onDeleteComment={(e)=>this.handleDeleteComment(e)} />
            </div>
        )
    }
}
CommentApp = WrapWithLoadData(CommentApp, 'comments');
export default CommentApp