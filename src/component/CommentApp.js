import React,{Component,PropTypes} from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import WrapWithLoadData from './WrapWithLoadData';

class CommentApp extends Component{
    static propTypes = {
        data:PropTypes.any,
        saveData:PropTypes.func.isRequired
    };
    constructor(){
        super();
        this.state={
            comments:this.props.data||[]
        };
    }

    handleDeleteComment(index){
        const comments = this.state.comments;
        comments.splice(index,1);
        this.setState({comments});
        this.props.saveData(comments);
    }
    handleSubmitComment(comment){
        if(!comment) return;
        if(!comment.username){
            alert('请输入用户名');
            return;
        }
        if(!comment.content){
            alert('请输入内容');
            return;
        }
        const comments = this.state.comments;
        comments.push(comment);
        this.setState({comments});
        this.props.saveData(comments);
    }
    render(){
        return(
            <div className='wrapper'>
                <CommentInput onSubmit={(e)=>this.handleSubmitComment(e)} />
                <CommentList
                    comments={this.state.comments}
                    onDeleteComment={(e)=>this.handleDeleteComment(e)}
                />
            </div>
        )
    }
}
CommentApp = WrapWithLoadData(CommentApp,'comments')
export default CommentApp