var React = require('react');

var Footer = React.createClass({
    render: function () {
        return (
            <footer className='footer'>
                Designed by&nbsp;
                <a href="mailto:nf071590@gmail.com">
                    Nicolas A. Fiorini
                </a>
                <br/>
                <i className="fa fa-copyright"></i> 2015
            </footer>
        );
    }
});

module.exports = Footer;
