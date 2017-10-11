import React      from 'react'
import {NavLink}     from 'react-router-dom';

const Navigation = (props) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink exact to="/" activeClassName="b-menu__active" className="nav-link">Список</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/new" activeClassName="b-menu__active" className="nav-link">Добавить ссылку</NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navigation;
