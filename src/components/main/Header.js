import React from 'react';
import logo from '../../assets/icons/logo.svg';
import '../../assets/styles/main/Header.css';

/* @class Component of the Header
 * @param name Label for generating the Title */
export default class Header extends React.Component {
    
    constructor(params) {
        super(params);
        this.title = params.name;
    }

    render() {
        return (
        <header className="App-Header">
            <img src={logo} className="Logo" alt="logo" />
            <span className="Title">{this.title}</span>
        </header>
      );
    }
}