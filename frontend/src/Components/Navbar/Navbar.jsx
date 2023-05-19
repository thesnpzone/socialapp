import React, { useState } from 'react'

import styled from "styled-components";
import logo from '../../Asset/img/Llogo.png'
import home from '../../Asset/img/home.png'
import addpost from '../../Asset/img/addpost.png'
import search from '../../Asset/img/search.png'
import account from '../../Asset/img/account.png'
import vc from '../../Asset/img/vc.png'
import os from '../../Asset/img/os.png'
import na from '../../Asset/img/na.png'
import wa from '../../Asset/img/wa.png'
import da from '../../Asset/img/da.png'
import translatere from '../../Asset/img/translatere.png'

import { Link, NavLink } from 'react-router-dom'



const COLORS = {
    primaryDark: "#B193C2",
    primaryLight: "#F3E6FA",
    menulabel:"#8546F0"
};

const MenuLabel = styled.label`
    background-color: ${COLORS.menulabel};

    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
    text-align: center;
  `;

const NavBackground = styled.div`
    position: fixed;
    top: 6.5rem;
    right: 6.5rem;
    background-image: radial-gradient( ${COLORS.primaryDark},${COLORS.primaryLight}
    );
    height: 6rem;
    width: 6rem;
    border-radius: 50%;
    z-index: 600;
    transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
    transition: transform 0.8s;
  `;

const Icon = styled.span`
    position: relative;
    background-color: ${(props) => (props.clicked ? "transparent" : "black")};
    width: 30px;
    height: 2px;
    display: inline-block;
    margin-top: 22px;
    transition: all 0.3s;
  
    &::before,
    &::after {
      content: "";
      background-color: black;
      width: 30px;
      height: 2px;
      display: inline-block;
  
      position: absolute;
      left: 0;
      transition: all 0.3s;
    }
  
    &::before {
      top: ${(props) => (props.clicked ? "0" : "-0.8rem")};
      transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
    }
  
    &::after {
      top: ${(props) => (props.clicked ? "0" : "0.8rem")};
  
      transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
    }
  
    ${MenuLabel}:hover &::before {
      top: ${(props) => (props.clicked ? "0" : "-1rem")};
    }
    ${MenuLabel}:hover &::after {
      top: ${(props) => (props.clicked ? "0" : "1rem")};
    }
  `;

const Navigation = styled.nav`
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 600;
    width: ${(props) => (props.clicked ? "100%" : "0")};
    opacity: ${(props) => (props.clicked ? "1" : "0")};
  
    transition: width 0.8s, opacity 0.8s;
  `;

const List = styled.ul`
    position: absolute;
    list-style: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;
  `;
const ItemLink = styled(NavLink)`
    display: inline-block;

    text-decoration: none;
    color: ${COLORS.primaryLight};
    padding: 1rem 2rem;
  

    /* background-size: 240%; */
    transition: all 0.4s;
  

  `;


export const Navbar = () => {


    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    return (
        <>
            <MenuLabel htmlFor="navi-toggle" onClick={handleClick}>
                <Icon clicked={click}>&nbsp;</Icon>
            </MenuLabel>
            <NavBackground clicked={click}>&nbsp;</NavBackground>

            <Navigation clicked={click}>
                <List>
                    <div class="container">

                        <div class="row">

                            <div className="col-lg-3">

                                <li>
                                    <ItemLink onClick={handleClick} to="/">
                                        <img src={home} alt="" />
                                        <p>Home</p>
                                    </ItemLink>
                                </li>

                            </div>

                            <div className="col-lg-3">

                                <li>
                                    <ItemLink onClick={handleClick} to="/newpost">
                                        <img src={addpost} className='pb-2' alt="" />
                                        <p>Add</p>
                                    </ItemLink>
                                </li>

                            </div>

                            <div className="col-lg-3">

                                <li>
                                    <ItemLink onClick={handleClick} to="/search">

                                        <img src={search} className='pb-2' alt="" />
                                        <p>search</p>

                                    </ItemLink>
                                </li>

                            </div>

                            <div className="col-lg-3">

                                <li>
                                    <ItemLink onClick={handleClick} to="/account">

                                        <img src={account} className='pb-2' alt="" />
                                        <p>Profile</p>

                                    </ItemLink>
                                </li>

                            </div>

                        </div>

                        <div class="row mt-5 pt-5">


                            <div className="col-lg-3">

                                <ItemLink onClick={handleClick} to="/wheatherapp">

                                    <img src={wa} className='pb-2' alt="" />
                                    <p>Weather App</p>

                                </ItemLink>

                            </div>

                            <div className="col-lg-3">

                                <ItemLink onClick={handleClick} to="/dictionaryapp">

                                    <img src={da} className='pb-2' alt="" />
                                    <p>Dictionary App</p>

                                </ItemLink>

                            </div>

                            <div className="col-lg-3">

                                <ItemLink onClick={handleClick} to="/translatere">

                                    <img src={translatere} className='pb-2' alt="" />
                                    <p>Translatere</p>

                                </ItemLink>

                            </div>

                            <div className="col-lg-3">

                                <a onClick={handleClick} href="https://originsearch.netlify.app/search" target="_blank">



                                    <img src={os} className='pb-2' alt="" />
                                    <p>Origen Search</p>


                                </a>

                            </div>

                        </div>


                        <div class="row mt-5 pt-5">






                            <div className="col-lg-3 text-center">

                                <a href="https://origencommunity.netlify.app" target="_blank">

                                    <img src={vc} className='pb-2' alt="" />
                                    <p>Vedio Calling</p>

                                </a>

                            </div>


                        </div>

                    </div>





                </List>
            </Navigation>
        </>
    );
}
