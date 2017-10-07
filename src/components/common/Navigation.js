import React      from 'react'
import {NavLink}     from 'react-router-dom';

const Navigation = (props) => (
  <div className="b-menu">
    <NavLink exact to="/" activeClassName="b-menu__active" className="b-menu__i">Список</NavLink>
    <NavLink to="/new" activeClassName="b-menu__active" className="b-menu__i">Добавить ссылку</NavLink>
  </div>
);

export default Navigation;
