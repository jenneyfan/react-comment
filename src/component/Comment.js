import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
    static propTypes = {
        comment:PropTypes.object.isRequired,
        onDeleteComment:PropTypes.func,
        index:PropTypes.number
    };
    constructor(props) {
        super(props);
        this.state={
            timeString:''
        }
    }
    componentWillMount(){
        this._updateTimeString();
        this._timer = setInterval(this._updateTimeString.bind(this),5000);
    }
    componentWillUnmount(){
        clearInterval(this._timer);
    }
    handleDeleteComment(){
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(this.props.index);
        }
    }
    _updateTimeString(){
        const comment = this.props.comment;
        const duration = parseInt((+Date.now() - comment.createdTime)/1000);
        this.setState({
            timeString:this._formatTimeString(duration)
        })
    }
    _formatTimeString(s){
        let day = parseInt(s / (60 * 60 * 24));
        let hour = parseInt(s / (60 * 60));
        let min = parseInt(s / 60);
        let sec = Math.max(s,1);
        return this._isShow(day,'天') || this._isShow(hour,'小时') || this._isShow(min,'分钟') || this._isShow(sec,'秒');
    }
    _isShow(n,str){
        return n > 0 ? n + str + '前' : '';
    }
    _getProcessedContent (content) {
        return content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }

    render() {
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span className='comment-username'>{this.props.comment.username}</span> :
                    <p dangerouslySetInnerHTML={{__html:this._getProcessedContent(this.props.comment.content)}} />
                    <span className='comment-createdtime'>{this.state.timeString}</span>
                    <span
                        onClick={(e)=>this.handleDeleteComment(e)}
                        className='comment-delete'>
                        删除
                    </span>
                </div>
            </div>
        )
    }
}

export default Comment