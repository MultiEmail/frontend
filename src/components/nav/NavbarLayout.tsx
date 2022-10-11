import { Outlet } from 'react-router-dom';
import { FC } from 'react';
import Navbar from './Nav';

const NavbarLayout: FC = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default NavbarLayout;