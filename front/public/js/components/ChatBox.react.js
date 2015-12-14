var React = require('react');

var InputArea = require('./InputArea.react');
var Message = require('./Message.react');

var feed = [];

var ChatBox = React.createClass({
    getInitialState: function () {
        return {
            feed: []
        }
    },

    componentDidMount: function () {
        this.feed = [];
        window.ChatBox.socket.on('chat message', this.updateChatFeed);
    },

    updateChatFeed: function (msg) {
        var key = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

        feed.push(
            <Message
                data={msg}
                key={key} />
        );

        this.setState({
            feed: feed
        });
    },

    render: function () {
        var id;
        var messages = [];

        return (
            <div className="chatbox">
                <section className="message-section">
                    { this.state.feed }
                </section>
                <InputArea />
            </div>
        );
    }
});

module.exports = ChatBox;
