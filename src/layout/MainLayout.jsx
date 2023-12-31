import React from 'react';
import Header from '../pages/Shared/Header/Header';
import { Outlet } from 'react-router-dom';
import FooterBottom from '../pages/Shared/FooterBottom/FooterBottom';

const MainLayout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <FooterBottom></FooterBottom>
        </div>
    );
};

export default MainLayout;