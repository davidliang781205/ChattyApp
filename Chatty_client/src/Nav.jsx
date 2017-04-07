import React, {Component} from 'react';

class Nav extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <div className="user-count">
                    {this.props.number + ' Users Online'}
                </div>
            </nav>

        );
    }
}
export default Nav;
