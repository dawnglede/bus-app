import React, { useState } from 'react';
import { NavBarStyle, Logo, MenuStyle, DropdownMenuStyle, FindBusIcon } from './style';
import logo from  '../../assets/Logo.svg';
import menuIcon from '../../assets/menu.svg';
import searchIcon from '../../assets/searchicon.svg';
import { Link } from 'react-router-dom';

export const NavBar = () => {
    //選單是否開啟
    const [ isMenuOpen, setIsMenuOpen ] = useState(true);
    
    //選單狀態
    const showMenu = () => {
      const menu = document.getElementById('dropdown');
      if (isMenuOpen === false) {
        setIsMenuOpen(true);
        //menu.style.display = 'none';
      } else {
        setIsMenuOpen(false);
        //menu.style.display = 'block';
      }
    }
    
    //打開、隱藏選單
    function dropdownMenu() {
      const navBar = document.getElementById('navBar');
      if (isMenuOpen === true) {
        navBar.style.overflow = 'visible';
        showMenu();
      } else {
        navBar.style.overflow = 'hidden';
        showMenu();
      }
    } 

    return (
      <NavBarStyle id="navBar" className="navbar">
          <Logo><img src={logo} alt="logo"/></Logo>
          <Link to="/" className="link">
            <FindBusIcon>
              <img src={searchIcon} alt="searchbus"/>
              找公車
            </FindBusIcon>
          </Link>
          {/*<MenuStyle className="menu" onClick={dropdownMenu} >
            <img src={menuIcon} alt="menuIcon"/>
          </MenuStyle>
          
          <DropdownMenuStyle id="dropdown" className="dropdown">
            <a href="#">找公車</a>
            <div className="first-border"></div>
            <a href="#">附近站牌</a>
            <div className="second-border"></div>
            <a href="#">轉乘規劃</a>
            </DropdownMenuStyle>*/}
      </NavBarStyle>
    );
};

