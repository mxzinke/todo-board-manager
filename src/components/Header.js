import React from 'react';
import logo from '../assets/icons/logo.svg';
import '../assets/styles/Header.css';

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
            <img src={logo} className="logo" alt="logo" />
            <span id="title">{this.title}</span>
        </header>
      );
    }
}