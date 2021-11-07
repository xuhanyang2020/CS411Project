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
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import Icon from '@material-tailwind/react/Icon';
import Button from '@material-tailwind/react/Button';

export default function GatherSportNav() {
    const [openNavbar, setOpenNavbar] = useState(false);

    return (
        <Navbar navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    {/* <a
                        href="https://material-tailwind.com?ref=mtk"
                        target="_blank"
                        rel="noreferrer"
                    > */}
                        <NavbarBrand>gatherSports</NavbarBrand>
                    {/* </a> */}
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

                            <NavLink>
                                <Icon name="account_circle" size="2xl" />
                                &nbsp;People
                            </NavLink>

                            {/* TODO: if a user log in, show his/her firstname  */}
                            
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}
