const React = require('react');
const ReactDOM = require('react-dom');
const MyApp = require('./MyApp.react');

window.ChatBox = {};
window.ChatBox.socket = require('socket.io-client/socket.io')();


ReactDOM.render(
    <MyApp />,
    document.getElementById('chatter')
);
