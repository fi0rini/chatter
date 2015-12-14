var React = require('react');
var MessageStore = require('stores/MessageStore');

var Header = require('components/Header.react');
var Login = require('components/Login.react');
var ChatBox = require('components/ChatBox.react');
var Footer = require('components/Footer.react');

window.ChatBox = {};
window.ChatBox.socket = socket = require('socket.io-client/socket.io')();

// retrieve current state of the MessageStore
function getMessageState () {
    return {};
}

var MyApp = React.createClass({

    getInitialState: function () {
        return {
            authenticated: false
        };
    },

    componentDidMount: function () {

    },

    componentWillUnmount: function () {

    },

    render: function () {

        return (
            <div>
                <Header />
                    <ChatBox />
                <Footer />
            </div>
        );
    },

    /**
     * Event handler for on MessageStore change events
     */
    _onChange: function () {
        this.setState(getMessageState());
    }
});

module.exports = MyApp;
