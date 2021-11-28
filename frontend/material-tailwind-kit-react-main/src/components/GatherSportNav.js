import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Dropdown from '@material-tailwind/react/Dropdown';
import Button from "@material-tailwind/react/Button"
import DropdownItem from '@material-tailwind/react/DropdownItem';
import { useEffect } from 'react';
import Nav from '@material-tailwind/react/Nav';
import NavLink from '@material-tailwind/react/NavLink';
import Icon from '@material-tailwind/react/Icon';
import axios from 'axios';

async function getNotification(userid) {
    var baseURL = "http://localhost:8080/match/mateRequest/";
    var notifications = await axios.get(baseURL+userid);
    return notifications.data;
}

async function getNotificationName(ids) {
    const names = [];
    var baseURL = 'http://localhost:8080/profile/';
    for (const id of ids) {
        let res = (await axios.get(baseURL+id)).data;
        let name = res[0]['firstName'] + ' ' + res[0]['lastName'];
        names.push(name);
    }
    return names;
}
export default function GatherSportNav({username, userid}) {
    const updateURL = "http://localhost:8080/match/updateState"
    const [openNavbar, setOpenNavbar] = useState(false);
    if (!username || username.length===0) {
        username = ""; 
    }

    if (!userid || userid.length===0) {
        userid = "24";
    }

    const [notificationId, setNotificationId] = useState('');
    const [notificationName, setNotificationName] = useState('');

    useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!notificationId) {
        get();
    }
    }, []);

  const get = async () => {
    const ids = await getNotification(userid);
    setNotificationId(ids);
    const names = await getNotificationName(ids);
    setNotificationName(names);
  };


  const updateState = async(name, state) => {
    // TODO: assume there is no notification with same name
    var i = notificationName.indexOf(name);
    console.log({
        resid: userid,
        requestid: notificationId[i],
        res: "Acpt"
    });
    await axios.put(updateURL, null,
        {
        params: {
            resid: userid,
            requestid: notificationId[i],
            res: state
        }
    });
    await get();
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
                            {/* <Link to='/reservation'>
                                <NavLink
                                >
                                    <Icon name="book_online" size="2xl" />
                                     &nbsp;Reservation 
                                </NavLink>
                            </Link> */}

                            <Link to='/match'>
                                <NavLink>
                                    <Icon name="accperson_add" size="2xl" />
                                    {/* &nbsp;People */}
                                </NavLink>  
                            </Link>

                            <NavLink>
                                    <Icon name="computer" size="2xl" />
                                    {/* &nbsp;Course */}
                            </NavLink>

                            <Link to='/message'>
                                <NavLink>
                                    <Icon name="feed" size="2xl" />
                                    {/* &nbsp;Message  */}
                                </NavLink>
                            </Link>

                            <div className="text-white">
                                <Dropdown
                                    color="transparent"
                                    size="regular"
                                    buttonType="link"
                                    buttonText={
                                        <div className="py-2.5 font-medium flex items-center">
                                            <Icon name="notifications" size="2xl" />
                                            <span className="ml-2">
                                             &nbsp;Friend Request
                                            </span>
                                        </div>
                                    }
                                    ripple="light"
                                >
                                    {notificationName?notificationName.map(
                                        name => (
                                            <DropdownItem color="lightBlue">
                                            {name} &nbsp;

                                            <Button
                                                className="resLink"
                                                color="pink"
                                                buttonType="link"
                                                size="sm"
                                                rounded={false}
                                                block={false}
                                                iconOnly={true}
                                                ripple="dark"
                                                ref={(node) => {
                                                    if (node) {
                                                      node.style.setProperty("display", "inline-block", "important");
                                                      node.style.setProperty("float", "right", "important");
                                                    }
                                                  }}
                                                  onClick={() =>{updateState(name, 'Rej')}}
                                            ><Icon name="clear" size="sm" /></Button>

                                            <Button
                                                className="resLink"
                                                color="lightGreen"
                                                buttonType="link"
                                                size="sm"
                                                rounded={false}
                                                block={false}
                                                iconOnly={true}
                                                ripple="dark"
                                                ref={(node) => {
                                                    if (node) {
                                                      node.style.setProperty("display", "inline-block", "important");
                                                      node.style.setProperty("float", "right", "important");
                                                    }
                                                  }}
                                                onClick={async () =>{updateState(name, 'Acpt')}}
                                            ><Icon name="favorite" size="sm"/></Button>
                                            
                                        </DropdownItem>
                                        )
                                    ):""}

                                </Dropdown>
                            </div>

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
