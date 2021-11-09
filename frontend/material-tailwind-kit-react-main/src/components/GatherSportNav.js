import { useState } from 'react';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Nav from '@material-tailwind/react/Nav';
import NavLink from '@material-tailwind/react/NavLink';
import { Link } from "react-router-dom";
import Icon from '@material-tailwind/react/Icon';
// import "./styles.css";

export default function GatherSportNav({username}) {
    const [openNavbar, setOpenNavbar] = useState(false);
    if (!username || username.length===0) {
        username = "";       
    }

    return (
        
        <Navbar navbar>
            <NavbarContainer>
                <NavbarWrapper>
                        <NavbarBrand>gatherSports</NavbarBrand>
                    <NavbarToggler
                        onClick={() => setOpenNavbar(!openNavbar)}
                        // color="black"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 lg:flex-row lg:items-center">
                            <NavLink
                            >
                                <Icon name="description" size="2xl" />
                                &nbsp;Reservation
                            </NavLink>

                            <Link to='/match'>
                                <NavLink>
                                    <Icon name="account_circle" size="2xl" />
                                    &nbsp;People
                                </NavLink>  
                            </Link>

                            {/* if a user log in, show his/her firstname  */}
                            <Link to='/profile'>
                                <NavLink className="username">{username}</NavLink>
                            </Link>
                            
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}
