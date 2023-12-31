import React, { useContext } from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProviders';
import Swal from 'sweetalert2';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log(user);
    const navigate = useNavigate();
    const hendleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Good job!",
                    text: "Sign-out successful!",
                    icon: "success"
                });
                navigate('/login')
            }).catch((error) => {
                // An error happened.
            });
    }
    return (
        <Navbar fluid rounded>
            <Link to='/'>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Doctor Management</span>
            </Link>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img={user && user.photoURL} rounded />
                    }
                >
                    {
                        user && <> <Dropdown.Header>
                            <span className="block text-sm">{user?.displayName}</span>
                            <span className="block truncate text-sm font-medium">{user?.email}</span>
                        </Dropdown.Header>
                            <Dropdown.Item>Dashboard</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Earnings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={hendleLogOut}>Sign out</Dropdown.Item></>
                    }
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Link to="/" >Home</Link>

                {
                    user && <Link to="/bookings">My Booking</Link>

                }
                <Link to="/login">Login</Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;