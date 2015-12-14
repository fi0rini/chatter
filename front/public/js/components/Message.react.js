var React = require('react');

var Message = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.data}
            </div>
        );
    }
});

module.exports = Message;
