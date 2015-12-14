var React = require('react');

var InputArea = React.createClass({
    getInitialState: function () {
        return {
            messageText: '',
        }
    },

    updateMessageText: function (e) {
        this.setState({
            messageText: e.target.value
        });
    },

    sendMessage: function (e) {
        socket.emit('chat message', this.state.messageText);
        this.clearForm();
    },

    clearForm: function (e) {
        this.setState({
            messageText: ''
        });
    },

    render: function () {
        return (
            <div className='inputarea'>
                <textarea className="form-control" onChange={this.updateMessageText} placeholder="Enter your message!" value={this.state.messageText} rows="1"></textarea>
                <div className='controls'>
                    <button type="submit" onClick={this.sendMessage} className="btn btn-primary">Send</button>
                </div>
            </div>
        );
    }
});

module.exports = InputArea;
