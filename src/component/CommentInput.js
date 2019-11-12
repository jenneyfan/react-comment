import React, {Component} from 'react';
import WrapWithLoadData from './WrapWithLoadData';

class CommentInput extends Component {
    constructor(props){
        super(props);
        this.state={
            username:props.data,
            content:''
        };
    }
    // 挂载时读取用户名
    componentWillMount(){
        this.props.saveData(this.state.username);
    }
    // 自动聚焦
    componentDidMount(){
        this.textarea.focus();
    }
    // 失去焦点保存用户名
    handleUsernameBlur(e){
        this.props.saveData(e.target.value);
    }
    // 设置用户名
    handleUsernameChange(e){
        this.setState({
            username:e.target.value
        })
    }
    // 设置评论内容
    handleContentChange(e){
        this.setState({
            content:e.target.value
        })
    }
    // 提交
    handleSubmit(){
        if(this.props.onSubmit){
            const {username,content} = this.state;
            this.props.onSubmit({
                username,
                content,
                createdTime:+new Date()
            });
        }
        this.setState({
            content:''
        })
    }

    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input
                            value={this.state.username}
                            onBlur={(e)=>this.handleUsernameBlur(e)}
                            onChange={(e)=>this.handleUsernameChange(e)}
                        />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea
                            ref={(textarea)=>this.textarea=textarea}
                            value={this.state.content}
                            onChange={(e)=>this.handleContentChange(e)}
                        ></textarea>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={(e)=>this.handleSubmit(e)}>发布</button>
                </div>
            </div>
        )
    }
}
CommentInput = WrapWithLoadData(CommentInput,'username');
export default CommentInput