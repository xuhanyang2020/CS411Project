import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Nav from '@material-tailwind/react/Nav';
import NavLink from '@material-tailwind/react/NavLink';
import Icon from '@material-tailwind/react/Icon';

export default function GatherSportNav({username}) {
    const [openNavbar, setOpenNavbar] = useState(false);
    if (!username || username.length===0) {
        username = "";
    }
    return (
        <Navbar navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <Link to='/overview?id=24'>
                        <NavbarBrand>gatherSports</NavbarBrand>
                        <NavbarToggler
                            onClick={() => setOpenNavbar(!openNavbar)}
                            // color="black"
                        />
                    </Link>
                </NavbarWrapper>
                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 lg:flex-row lg:items-center">
                            <Link to='/reservation'>
                                <NavLink
                                >
                                    <Icon name="description" size="2xl" />
                                    &nbsp;Reservation
                                </NavLink>
                            </Link>
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