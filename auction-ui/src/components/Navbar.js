import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UserService from '../services/Users.js';
import { SITE_LOGO, SITE_NAME } from '../services/Constants';
import Logo from './Logo';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.user = new UserService();
    this.state = {
      userType: this.user.userType,
      username: this.user.currentUser().username,
    };
  }

  render() {
    let { username } = this.state;
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href='\'>
            {/* <div className="d-flex justify-content-center align-items-center">
              <img src={SITE_LOGO} alt="{SITE_NAME}" width="" height="75" />
            </div> */}
            <Logo marginBtm = '0px' />
          </a>
          <div className="dropdown">
            <a href="#navbarToggleMyAccount" className="dropdown-toggle" data-toggle="dropdown" data-target="#navbarToggleMyAccount" aria-controls="navbarToggleMyAccount" aria-expanded="false" aria-label="My Account">{username}</a>
            <div className="dropdown-menu dropdown-menu-right" id="navbarToggleMyAccount">
              <NavLink to="/" className={({ isActive }) => isActive ? "active dropdown-item disabled" : "dropdown-item disabled"} >Thay đổi mật khẩu</NavLink>
              <NavLink to="/signout" className={({ isActive }) => isActive ? "active dropdown-item" : "dropdown-item"} >Đăng xuất</NavLink>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
